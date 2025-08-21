import { contentJson, OpenAPIRoute } from "chanfana";
import { initDbConnect } from "../../db";
import { todos } from "../../db/schema";
import { z } from "zod";
import { Context } from "hono";

export class CreateTodoEndpoint extends OpenAPIRoute {
    schema = {
        tags: ["Todos"],
        operationId: "createTodo",
        request: {
            body: {
                ...contentJson(z.object({
                    title: z.string().min(1, "Title is required"),
                    description: z.string().min(1, "Description is required"),
                    completed: z.boolean().optional(),
                }))
            }
        },
        responses: {
            "201": {
                description: "List of all todos",
                ...contentJson(
                    z.object({
                        id: z.number().int(),
                        title: z.string(),
                        description: z.string(),
                        completed: z.boolean(),
                        createdAt: z.string().datetime(),
                    })

                )
            }
        }
    }

    async handle(c: Context) {
        const db = initDbConnect(c.env);
        const { body: newTodo } = await this.getValidatedData<typeof this.schema>();

        const [createdTodo] = await db.insert(todos).values({
            title: newTodo.title,
            description: newTodo.description,
            completed: newTodo.completed ?? false,
        }).returning();
        return c.json(createdTodo, 201);
    }
}
