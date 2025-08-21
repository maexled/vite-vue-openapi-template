
# Vite Vue OpenAPI Template

>This template provides a modern, full-stack starter for building Vue 3 apps with a typed backend and frontend, using OpenAPI and code generation for seamless integration.

## Tech Stack

- **Vue 3** — The progressive JavaScript framework for building user interfaces
- **Vuetify** — Material Design component framework for Vue
- **Hono** — Super-fast, lightweight web framework for the backend (API)
- **Chanfana** + **openapi-ts** — OpenAPI contract-first backend (Chanfana) and code generation for both backend and frontend (openapi-ts)
- **TanStack Query** — Powerful async state management for data fetching and caching
- **Drizzle ORM** — Type-safe SQL ORM for database access
- **Zod** — TypeScript-first schema validation
- **vue-i18n** — Internationalization plugin for Vue

---

## Getting Started

### 1. Install dependencies

```sh
npm install
```

### 2. Create a D1 Database

This template uses [Cloudflare D1](https://developers.cloudflare.com/d1/) as the database. You must create a D1 database in your Cloudflare account.

1. Create the database using Wrangler:

	```sh
	npx wrangler d1 create vite-vue-openapi-template-db
	```

	This will output a `database_id`.
2. Copy the generated `database_id`
3. Replace `replace_with_your_database_id` in `wrangler.jsonc` with your actual database ID:

```jsonc
"d1_databases": [
	{
		"binding": "DB",
		"database_name": "vite-vue-openapi-template-db",
		"database_id": "your_database_id_here",
		"migrations_dir": "migrations"
	}
]
```

### 3. Apply Migrations

#### Locally (for development)

```sh
npm run seedLocalD1
```

#### Remote (Cloudflare D1)

```sh
npm run predeploy
```

---

### 4. Generate OpenAPI Client & Types

This project uses [Chanfana](https://chanfana.pages.dev/) to expose your API as OpenAPI, and [openapi-ts](https://github.com/hey-api/openapi-ts) to generate fully typed API clients, Zod schemas, and TanStack Query hooks from your OpenAPI spec.

```sh
npm run generate
```

This will:
- Generate TypeScript types and Zod schemas for your API
- Generate TanStack Query hooks for easy data fetching
- Keep your frontend and backend in sync with your API definition

---

### 5. Start the Development Server

```sh
npm run dev
```

---

## Using TanStack Query with openapi-ts

The generated TanStack Query hooks (in `src/client/@tanstack/`) make it easy to fetch and mutate data with full type safety. Example usage:

```ts
import { useQuery } from '@tanstack/vue-query';
import { getTodosOptions } from '@/client/@tanstack/vue-query.gen';

const { data, isLoading } = useQuery(getTodosOptions());
```

Mutations are just as easy:

```ts
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { createTodoMutation, getTodosQueryKey } from '@/client/@tanstack/vue-query.gen';

const queryClient = useQueryClient();
const { mutate } = useMutation({
	...createTodoMutation(),
	onSuccess: () => queryClient.invalidateQueries({ queryKey: getTodosQueryKey() }) // refetch all todos
});
```

---

## Internationalization (i18n)

Translations are managed in `src/locales/`. Use the `LanguageSwitcher` component to allow users to change languages at runtime.

---

## Customization

- [Define the endpoints with Chanfana](https://chanfana.pages.dev/endpoints/defining-endpoints) and generate the OpenAPI specification with `npm run generate`. This will output the schema in the root folder under `schema.json`. OpenAPI-TS then generates the client code for the frontend.
- Update database schema in `server/db/schema.ts` and run migrations
- Customize UI with Vuetify themes in `src/plugins/vuetify.ts`

---

## Scripts

- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm run generate` — Generate OpenAPI client/types/hooks based on Chanfana endpoints
- `npm run seedLocalD1` — Apply DB migrations locally
- `npm run predeploy` — Apply DB migrations remotely
- `npm run test` — Run tests

---

## Credits

This template brings together the best of modern full-stack TypeScript development:

- [Vue 3](https://vuejs.org/)
- [Vuetify](https://vuetifyjs.com/)
- [Hono](https://hono.dev/)
- [OpenAPI](https://www.openapis.org/)
- [openapi-ts](https://github.com/hey-api/openapi-ts)
- [TanStack Query](https://tanstack.com/query/latest)
- [Drizzle ORM](https://orm.drizzle.team/)
- [Zod](https://zod.dev/)
- [vue-i18n](https://vue-i18n.intlify.dev/)
