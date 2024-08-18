const { test, expect, beforeEach, describe } = require("@playwright/test");
const { loginWith, createBlog } = require("./helper");

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
        page.on('dialog', dialog => dialog.accept());

        const blogLocator = page.getByText("test title - by playwright");
        await blogLocator.getByRole("button", { name: "view" }).click();

        const deleteButton = page.getByRole("button", { name: "remove" });
        await expect(deleteButton).toBeVisible();
        await deleteButton.click();

        await expect(page.getByText(/test title - by playwright/)).not.toBeVisible();
      });
    });
  });
});
