const { test, expect, beforeEach, describe } = require("@playwright/test");

describe("Blog app", () => {
  beforeEach(async ({ page }) => {
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
});
