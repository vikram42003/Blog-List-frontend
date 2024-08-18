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
  });
});
