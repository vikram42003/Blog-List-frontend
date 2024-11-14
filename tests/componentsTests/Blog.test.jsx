import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { Context } from "../../src/ContextProvider";

import Blog from "../../src/components/Blog";

vi.mock("@tanstack/react-query", () => ({
  useMutation: () => ({ mutate: vi.fn(), isPending: false }),
  useQueryClient: vi.fn(),
}))

vi.mock("react-router-dom", () => ({
  useNavigate: vi.fn(),
}))

//  Blog = ({ blog })
//  type blog {
//    title: string;
//    url: string;
//    likes: number;
//    user: user;
//    comments: [string];
//  }
describe("<Blog />", () => {
  const mockBlog = {
    id: "1",
    title: "Testing blog",
    author: "ME",
    url: "some url",
    likes: 10,
    comments: ["comment 1", "comment 2"],
  }

  const mockShowNotification = vi.fn();
  const mockNavigate = vi.fn();
  const mockQueryClient = {
    getQueryData: vi.fn(),
    setQueryData: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    useNavigate.mockReturnValue(mockNavigate);
    useQueryClient.mockReturnValue(mockQueryClient);
  });

  it("renders the blog's title, author, likes, url and comments", () => {
    render(
      <Context.Provider value={{ showNotification: mockShowNotification }}>
        <Blog blog={mockBlog} />
      </Context.Provider>
    );
    const text1 = screen.getByText(/Testing blog/);
    const text2 = screen.getByText(/some url/);
    const text3 = screen.getByText(/10/);
    const text4 = screen.getByText(/comment 1/);
    const text5 = screen.getByText(/comment 2/);

    expect(text1).toBeDefined();
    expect(text2).toBeDefined();
    expect(text3).toBeDefined();
    expect(text4).toBeDefined();
    expect(text5).toBeDefined();
  });

  it("remove button is shown if the blog is written by the user", () => {
    mockBlog.user = { username: "same" };

    render(
      <Context.Provider value={{ user: { username: "same" } , showNotification: mockShowNotification }}>
        <Blog blog={mockBlog} />
      </Context.Provider>
    );

    const removeButton = screen.getByRole("button", { name: "remove" });
    expect(removeButton).toBeDefined()
  })
});
