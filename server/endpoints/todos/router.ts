import { Hono } from "hono";
import { GetTodosEndpoint } from "./getTodosEndpoint";
import { fromHono } from "chanfana";
import { CreateTodoEndpoint } from "./createTodoEndpoint";

const app = new Hono();

export const todosRouter = fromHono(app);

todosRouter.get("/", GetTodosEndpoint);
todosRouter.post("/", CreateTodoEndpoint);

