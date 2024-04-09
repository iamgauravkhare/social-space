import { fireEvent, render, renderHook, screen } from "@testing-library/react";
import { beforeAll, describe, expect, test } from "vitest";
import { PostCard } from "../../components";
import { format } from "date-fns";
import { Link } from "react-router-dom";

describe("App Component", () => {
  test.todo("display", () => {
    const item = {
      _id: "123",
      title: "demo",
      summary: "demo",
      author: { username: "demo" },
      createdAt: "1999-01-01 00:00",
    };
    const uri = "demo";
    render(<PostCard item={item} uri={uri} />);
  });
});
