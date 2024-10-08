const loginWith = async (page, username, password) => {
  await page.getByLabel("username").fill(username);
  await page.getByLabel("password").fill(password);
  await page.getByRole("button", { name: "Login" }).click();
};

const createBlog = async (page, blog) => {
  await page.getByRole("button", { name: "new blog" }).click();
  await page.getByLabel("title:").fill(blog.title);
  await page.getByLabel("author:").fill(blog.author);
  await page.getByLabel("url:").fill(blog.url);
  await page.getByRole("button", { name: "submit" }).click();

  await page.getByText(`${blog.title} - by ${blog.author}`).waitFor();
};

const likeBlog = async (page, title, num) => {
  await page.getByText(title).getByRole("button", { name: "view" }).click();
  const likeButton = await page.getByText(/likes/).getByRole("button", { name: "like" });
  for (let i = 0; i < num; i++) {
    await likeButton.click();
  }
  await page.getByText(`likes ${num}`).getByRole("button", { name: "hide" }).click();
};

module.exports = { loginWith, createBlog, likeBlog };
