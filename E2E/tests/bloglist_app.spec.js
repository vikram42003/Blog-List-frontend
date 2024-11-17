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
    test.only("Clicking on 'Log in' takes you to the login page", async ({ page }) => {
      const loginButton = page.getByRole("link", { name: "Log in" });
      loginButton.click();

      const usernameField = page.getByText("username");
      const passwordField = page.getByText("password");
      const loginButton2 = page.getByRole("button", { name: "Login" });

      await expect(usernameField).toBeVisible();
      await expect(passwordField).toBeVisible();
      await expect(loginButton2).toBeVisible();
    });

    test.only("A valid user can login", async ({ page }) => {
      const loginButton = page.getByRole("link", { name: "Log in" });
      loginButton.click();

      await loginWith(page, "test", "12345");

      await expect(page.getByText("logged in as test", { exact: true })).toBeVisible();
      await expect(page.url()).toBe("http://localhost:5173/");
    });

    test.only("An invalid user cannot login", async ({ page }) => {
      const loginButton = page.getByRole("link", { name: "Log in" });
      loginButton.click();

      await loginWith(page, "wrong", "wrong");

      await expect(
        page.getByText("Could not log in - username or password is incorrect", { exact: true })
      ).toBeVisible();
      await expect(page.url()).toBe("http://localhost:5173/login");
    });
  });

  test("Login form is shown", async ({ page }) => {
    const heading = page.getByText("log in to application");
    const usernameField = page.getByText("username");
    const passwordField = page.getByText("password");
    const loginButton = page.getByRole("button", { name: "Login" });

    await expect(heading).toBeVisible();
    await expect(usernameField).toBeVisible();
    await expect(passwordField).toBeVisible();
    await expect(loginButton).toBeVisible();
  });

  describe("Login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      await loginWith(page, "test", "12345");

      await expect(page.getByText("testUser logged in")).toBeVisible();
    });

    test("fails with wrong credentials", async ({ page }) => {
      await loginWith(page, "test", "incorrect");

      await expect(page.getByText("testUser logged in")).not.toBeVisible();
      await expect(page.getByText("Could not log in - username or password is incorrect")).toBeVisible();
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

    describe("And some blogs exist", () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, { title: "test title", author: "playwright", url: "no url" });
        await createBlog(page, { title: "another blog", author: "me", url: "url" });
        await createBlog(page, { title: "yet another blog", author: "who knows", url: "does not exist" });
      });

      test("a blog can be liked", async ({ page }) => {
        const blogLocator = page.getByText("another blog - by me");
        await blogLocator.getByRole("button", { name: "view" }).click();

        await expect(page.getByText(/likes 0/)).toBeVisible();
        await page.getByRole("button", { name: "like" }).click();
        await expect(page.getByText(/likes 1/)).toBeVisible();
      });

      test("a blog can be deleted by its creator", async ({ page }) => {
        page.on("dialog", (dialog) => dialog.accept());

        const blogLocator = page.getByText("test title - by playwright");
        await blogLocator.getByRole("button", { name: "view" }).click();

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

        await page.getByText("yet another blog - by who knows").getByRole("button", { name: "view" }).click();
        await expect(page.getByRole("button", { name: "remove" })).not.toBeVisible();
      });

      test("the blogs are arranged in descending order", async ({ page }) => {
        await likeBlog(page, "yet another blog - by who knows", 5);
        await likeBlog(page, "another blog - by me", 3);
        await likeBlog(page, "test title - by playwright", 1);

        await page.getByText("yet another blog - by who knows").getByRole("button", { name: "view" }).click();
        await page.getByText("another blog - by me").getByRole("button", { name: "view" }).click();
        await page.getByText("test title - by playwright").getByRole("button", { name: "view" }).click();

        await expect(page.getByText("likes")).toHaveText([/likes 5/, /likes 3/, /likes 1/]);
      });
    });
  });
});
