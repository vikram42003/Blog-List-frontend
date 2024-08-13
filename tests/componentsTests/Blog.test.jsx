import { render, screen } from "@testing-library/react";

import Blog from "../../src/components/Blog";

// Blog = ({ user, blog, blogs, setBlogs, setNotification })
// user: PropTypes.object.isRequired,
// blog: PropTypes.object.isRequired,
// blogs: PropTypes.arrayOf(PropTypes.object).isRequired,
// setBlogs: PropTypes.func.isRequired,
// setNotification: PropTypes.func.isRequired,
describe("<Blog />", () => {
  const mockUser = {};
  const mockBlog = {};
  const mockBlogs = [{}];
  const mockSetBlogs = vi.fn();
  const mockSetNotification = vi.fn();

  it("renders the blog's title and author, but does not render its URL or number of likes by default", () => {
    const testData = {
      title: "Testing blog",
      author: "ME",
      url: "should not render",
      likes: 10,
    };
    render(
      <Blog
        user={mockUser}
        blog={testData}
        blogs={mockBlogs}
        setBlogs={mockSetBlogs}
        setNotification={mockSetNotification}
      />
    );
    screen.debug();
    const textToRender = screen.getByText(/Testing blog - by ME/i);
    const toNotRender1 = screen.queryByText(/should not render/);
    const toNotRender2 = screen.queryByText(/likes 10/);

    expect(textToRender).toBeDefined();
    expect(toNotRender1).toBeNull();
    expect(toNotRender2).toBeNull();
  });
});
