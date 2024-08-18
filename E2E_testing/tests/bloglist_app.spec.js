const { test, expect, beforeEach, describe } = require("@playwright/test");

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

  describe.only("Login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      await page.getByLabel("username").fill("test");
      await page.getByLabel("password").fill("12345");
      await page.getByRole("button", { name: "Login" }).click();

      await expect(page.getByText("testUser logged in")).toBeVisible();
    })

    test("fails with wrong credentials", async ({ page }) => {
      await page.getByLabel("username").fill("test");
      await page.getByLabel("password").fill("incorrect");
      await page.getByRole("button", { name: "Login" }).click();

      await expect(page.getByText("testUser logged in")).not.toBeVisible();
      await expect(page.getByText("Could not log in - username or password is incorrect")).toBeVisible();
    })
  });
});
