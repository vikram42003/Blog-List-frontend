const { test, expect, beforeEach, describe } = require("@playwright/test");
const { loginWith, createBlog, likeBlog } = require("./helper");

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("/api/reset");
    await request.post("/api/users", {
      data: {
        username: "test",
        name: "testUser",
        password: "12345",
      },
    });

    await page.goto("/");
  });

  test("The homepage is shown", async ({ page }) => {
    const appName = page.getByText("Blog App");
    const navItem1 = page.getByText("blogs", { exact: true });
    const navItem2 = page.getByText("users");
    const loginButton = page.getByText("Log in");

    await expect(appName).toBeVisible();
    await expect(navItem1).toBeVisible();
    await expect(navItem2).toBeVisible();
    await expect(loginButton).toBeVisible();
  });

  describe("Login Page", () => {
    test("Clicking on 'Log in' takes you to the login page", async ({ page }) => {
      const loginButton = page.getByRole("link", { name: "Log in" });
      loginButton.click();

      const usernameField = page.getByText("username");
      const passwordField = page.getByText("password");
      const loginButton2 = page.getByRole("button", { name: "Login" });

      await expect(usernameField).toBeVisible();
      await expect(passwordField).toBeVisible();
      await expect(loginButton2).toBeVisible();
      await expect(page.url()).toBe("http://localhost:5173/login");
    });

    test("A valid user can login", async ({ page }) => {
      await loginWith(page, "test", "12345");

      await expect(page.getByText("logged in as test", { exact: true })).toBeVisible();
      await expect(page.url()).toBe("http://localhost:5173/");
    });

    test("An invalid user cannot login", async ({ page }) => {
      await loginWith(page, "wrong", "wrong");

      await expect(
        page.getByText("Could not log in - username or password is incorrect", { exact: true })
      ).toBeVisible();
      await expect(page.url()).toBe("http://localhost:5173/login");
    });
  });

  describe("When logged in", () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, "test", "12345");
    });

    test("a new blog can be created", async ({ page }) => {
      await createBlog(page, { title: "test title", author: "playwright", url: "no url" });

      await expect(page.getByText("test title - by playwright")).toBeVisible();
    });

    test("a logged in user can log out", async ({ page }) => {
      await page.getByRole("button", { name: "log out" }).click();

      await expect(page.getByText("Successfully logged out")).toBeVisible();
    });

    describe("And some blogs exist", () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, { title: "test title", author: "playwright", url: "no url" });
        await createBlog(page, { title: "another blog", author: "me", url: "url" });
        await createBlog(page, { title: "yet another blog", author: "who knows", url: "does not exist" });
      });

      test("clicking a blog takes you to that blog's page", async ({ page }) => {
        await page.getByText("another blog - by me").click();

        await expect(page.url()).toContain("http://localhost:5173/blogs/");
        await expect(page.getByText("another blog", { exact: true })).toBeVisible();
        await expect(page.getByText("by me")).toBeVisible();
      });

      test("a blog can be liked", async ({ page }) => {
        await likeBlog(page, "another blog - by me", 1);
        await expect(page.getByText("❤️ 1 ")).toBeVisible();
      });

      test("a blog can be deleted by its creator", async ({ page }) => {
        page.on("dialog", (dialog) => dialog.accept());

        await page.getByText("test title - by playwright").click();

        const deleteButton = page.getByRole("button", { name: "remove" });
        await expect(deleteButton).toBeVisible();
        await deleteButton.click();

        await expect(page.getByText(/test title - by playwright/)).not.toBeVisible();
      });

      test("a blog cannot be deleted by someone whos not the creator", async ({ page, request }) => {
        page.on("dialog", (dialog) => dialog.accept());

        await page.getByRole("button", { name: "log out" }).click();
        await request.post("/api/users", {
          data: {
            username: "secondUser",
            name: "secondUser",
            password: "54321",
          },
        });
        await loginWith(page, "secondUser", "54321");

        await page.getByText("yet another blog - by who knows").click();
        await expect(page.getByRole("button", { name: "remove" })).not.toBeVisible();
      });

      test("the blogs are arranged in descending order", async ({ page }) => {
        await likeBlog(page, "yet another blog - by who knows", 1);
        await page.getByRole("link", { name: "blogs" }).click();

        await expect(page.getByText("yet another blog - by who knows").getByText("❤️ 1")).toBeVisible();
        await expect(page.getByText("another blog - by me").getByText("❤️ 0")).toBeVisible();
        await expect(page.getByText("test title - by playwright").getByText("❤️ 0")).toBeVisible();
      });
    });
  });
});
