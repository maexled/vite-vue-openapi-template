import { SELF, env } from "cloudflare:test";
import { describe, it, expect, beforeAll } from "vitest";
import { initDbConnect } from "../server/db";
import { todos } from "../server/db/schema";

beforeAll(async () => {
  const db = initDbConnect(env);

  await db.insert(todos).values({
    id: 1,
    title: "Test Todo",
    description: "A test todo for testing",
    completed: false,
  });
});

describe("Test Todos Endpoints", () => {
  it("should return the list of todos", async () => {
    const response = await SELF.fetch("https://example.com/api/v1/todos");
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: 1,
          title: "Test Todo",
          description: "A test todo for testing",
          completed: false,
        }),
      ])
    );
  });
  it("should create a new todo", async () => {
    const response = await SELF.fetch("https://example.com/api/v1/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "New Todo",
        description: "A new todo for testing",
        completed: false,
      }),
    });
    const data = await response.json();

    expect(response.status).toBe(201);
    expect(data).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        title: "New Todo",
        description: "A new todo for testing",
        completed: false,
      })
    );
  });
  it("should throw bad request 400 when title is empty", async () => {
    const response = await SELF.fetch("https://example.com/api/v1/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "",
        description: "A new todo for testing",
        completed: false,
      }),
    });

    expect(response.status).toBe(400);
  });
});