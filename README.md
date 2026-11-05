# Task Manager

A simple task management application built with Next.js, React, TypeScript, tRPC, TanStack Query, and Zod.

## Features

- Create, edit, and delete tasks.
- Task title validation and optional descriptions.
- In-memory task storage.
- Server-side prefetching of the initial task list.
- Infinite scrolling with incremental pagination.
- Success and error notifications.
- Responsive interface.
- Expandable task items displaying additional metadata (task ID and creation date) when clicked.

## Technologies

- **Next.js** — application framework and server-side rendering.
- **React** — user interface and components.
- **TypeScript** — static typing.
- **tRPC** — type-safe communication between frontend and backend.
- **TanStack Query** — server state, caching, mutations, and infinite queries.
- **Zod** — input validation.
- **SuperJSON** — serialization of values such as dates.

## Icons

- [Pixel icons created by menon - Flaticon](https://www.flaticon.com/free-icons/pixel)
- [Pixel icons created by Libertyink - Flaticon](https://www.flaticon.com/free-icons/pixel)

## Getting Started

### Prerequisites

- Node.js 22 or compatible version.
- npm.

### Installation

Clone the repository and install the dependencies:

```bash
git clone https://github.com/TheWolFox/task-manager.git
cd task-manager
npm install
```

### Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts the development server |
| `npm run build` | Builds the application |
| `npm run start` | Starts the production server |
| `npm run lint` | Runs ESLint |

## How It Works

### Backend

The backend exposes task operations through tRPC procedures. Tasks are stored in an in-memory `Map`, so data is reset when the server process restarts.

The task router provides procedures to:

- Retrieve tasks using pagination.
- Create a task.
- Update an existing task.
- Delete a task.

Zod schemas validate incoming data, including ensuring that task titles are not empty.

### Frontend

The task manager uses React components and TanStack Query to communicate with the backend.

The initial task page is preloaded on the server and hydrated on the client. Additional tasks are fetched in batches of 10 as the user scrolls down the list.

Mutations invalidate the paginated task query to keep the displayed list synchronized with the backend.

## Project Structure

```text
app/
  api/                 # tRPC API route
  components/
    layout/            # Layout components
    shared/            # Reusable UI components
    tasks/             # Task-related components
  styles/              # Global and component styles
  page.tsx              # Main page

client/
  hooks/                # React Query hooks
  provider.tsx          # tRPC and Query providers
  queryClient.ts        # Query client configuration

server/
  models/               # Task schemas and types
  repositories/         # In-memory task storage
  routers/              # tRPC procedures
  trpc.ts               # tRPC configuration
  trpcServer.ts         # Server-side tRPC configuration
```