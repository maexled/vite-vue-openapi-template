import { ApiException, fromHono } from "chanfana";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { ContentfulStatusCode } from "hono/utils/http-status";
import { todosRouter } from "./endpoints/todos/router";

const app = new Hono<{ Bindings: Env }>();

app.onError((error, c) => {
  if (error instanceof ApiException) {
    // If it's a Chanfana ApiException, let Chanfana handle the response
    return c.json(
      { success: false, errors: error.buildResponse() },
      error.status as ContentfulStatusCode,
    );
  }

  if (error instanceof HTTPException) {
    return c.json(
      { success: false, error: error.message },
      error.status as ContentfulStatusCode,
    );
  }

  return c.json(
    {
      success: false,
      errors: [{ code: 7000, message: "Internal Server Error" }],
    },
    500,
  );
});

export const openapi = fromHono(app, {
  docs_url: "/docs",
  schema: {
    info: {
      title: "Vite Vue OpenAPI Template API",
      version: "0.0.1",
      description:
        "Build your app with Vite and Vue.js",
    },
  },
});

openapi.route("/api/v1/todos", todosRouter);

export default app;
