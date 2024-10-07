import { test, expect } from "@playwright/test";

// test local and production URLs
// ideally I want to setup a github action to test the production URL while deploying
// and alert me if the production URL fails the test

/*
Obviously this won't work in a CI/CD pipeline because the test is running on the local machine

test("has title on localhost", async ({ page }) => {
  await page.goto("http://localhost:3000");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/headwinds/);
}); */

test("has title in dynamic staging environment", async ({ page }) => {
  const baseUrl = process.env.PLAYWRIGHT_TEST_BASE_URL;
  await page.goto(baseUrl);
  // Your test logic here

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/headwinds/);
});

test("has title in static production environment", async ({ page }) => {
  await page.goto("https://headwinds.vercel.app/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/headwinds/);
});
