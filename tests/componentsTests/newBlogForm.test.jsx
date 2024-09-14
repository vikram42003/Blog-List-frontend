import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import NewBlogForm from "../../src/components/NewBlogForm";
import blogsService from "../../src/services/blogs";

// NewBlogForm = ({ blogs, setBlogs, setNotification, newNoteFormRef })
// blogs: PropTypes.arrayOf(PropTypes.object).isRequired,
// setBlogs: PropTypes.func.isRequired,
// setNotification: PropTypes.func.isRequired,
// newNoteFormRef: PropTypes.any.isRequired,

describe("<NewBlogForm />", () => {
  const mockBlogs = [{}];
  const mockSetBlogs = vi.fn();
  const mockSetNotification = vi.fn();
  const mockNewNoteFormRef = vi.fn();

  it("correct functions are called when a new blog is created", async () => {
    // DISABLE THIS TEST FROM LOGGING TO CONSOLE
    // Store the original console methods
    const originalConsoleLog = console.log;
    const originalConsoleError = console.error;

    // // Override console methods to suppress output
    console.log = () => {};
    console.error = () => {};

    const blogServiceSpy = vi.spyOn(blogsService, "addBlog");

    render(
      <NewBlogForm
        blogs={mockBlogs}
        setBlogs={mockSetBlogs}
        setNotification={mockSetNotification}
        newBlogFormRef={mockNewNoteFormRef}
      />
    );

    const user = userEvent.setup();

    const [titleField, authorField, urlField] = screen.getAllByRole("textbox");

    await user.type(titleField, "test test test");
    await user.type(authorField, "Testing library's user event");
    await user.type(urlField, "https://testing-library.com/docs/user-event/utility#type");

    const submitButton = screen.getByRole("button");
    await user.click(submitButton);

    expect(blogServiceSpy).toHaveBeenCalled(1);
    expect(blogServiceSpy.mock.calls[0][0]).toStrictEqual({
      title: "test test test",
      author: "Testing library's user event",
      url: "https://testing-library.com/docs/user-event/utility#type",
    });

    // Restore the original console methods
    console.log = originalConsoleLog;
    console.error = originalConsoleError;
  });
});
