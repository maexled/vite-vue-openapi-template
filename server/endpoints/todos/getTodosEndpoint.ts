import { contentJson, OpenAPIRoute } from "chanfana";
import { initDbConnect } from "../../db";
import { todos } from "../../db/schema";
import { z } from "zod";
import { Context } from "hono";

export class GetTodosEndpoint extends OpenAPIRoute {
    schema = {
        tags: ["Todos"],
        operationId: "getTodos",
        responses: {
            "200": {
                description: "List of all todos",
                ...contentJson(
                    z.array(
                        z.object({
                            id: z.number().int(),
                            title: z.string(),
                            description: z.string(),
                            completed: z.boolean(),
                            createdAt: z.string().datetime(),
                        })
                    )
                )
            }
        }
    }

    async handle(c: Context) {
        const db = initDbConnect(c.env);
        const allTodos = await db.select().from(todos);
        return c.json(allTodos);
    }
}
