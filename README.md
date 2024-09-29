# Queue-Management-App

A full-stack application for managing queues of messages with a REST API backend and a modern web frontend.

## Screenshots

![image](https://github.com/user-attachments/assets/22d5ba1d-27ed-42d7-9f1b-e839f86d8bec)
![image](https://github.com/user-attachments/assets/61c328b3-0ea2-4a8e-b738-f5123fda889b)
![image](https://github.com/user-attachments/assets/9680c9b3-62ca-4f78-aa6b-66f56038c871)

## Features

- Light/dark mode toggle
- Live previews
- Fullscreen mode
- Cross platform

## Features

- **POST /api/{queue_name}:** Add a new message to a specified queue.
- **GET /api/{queue_name}?timeout={ms}:** Retrieve the next message from the queue, with optional timeout support.
- **Queue Overview:** The frontend displays all available queues and the number of messages in each queue.
- **Fetch Next Message:** Select a queue, click ‘Fetch Next Message,’ and see the response.

## Technologies Used

Frontend:

- [ReactJS](https://reactjs.org)
- [Vite](https://vitejs.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind](https://tailwindcss.com/)
- [Redux Toolkit Query](https://redux-toolkit.js.org/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Radix UI](https://www.radix-ui.com/)
- [React Hook Form](https://react-hook-form.com/)
- [yup](https://github.com/jquense/yup)
- [Lucide](https://lucide.dev/guide/packages/lucide-react)
- [ESLint](https://eslint.org)

Backend:

- [Node.js](https://nodejs.org/en)
- [Express](https://expressjs.com/)

## Installation

To run this application locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/zivab/Queue-Management-App.git
   ```

2. Access the project.

   ```bash
   cd Queue-Management-App

   ```

3. Setup backend environment

   ```bash
    cd Backend

   ```

4. Install backend dependencies.

   ```bash
    pnpm install

   ```

5. Start the backend development server.

   ```bash
   pnpm run dev

   ```

6. The backend will run on port 5000.

7. Setup Frontend environment

   ```bash
    cd Frontend

   ```

8. Install Frontend dependencies.

   ```bash
    pnpm install

   ```

9. Start the Frontend development server.

   ```bash
   pnpm run dev

   ```

10. The Frontend will run on port 3000.

## API Endpoints

### `GET /api/v1/queues_details`

- **Description:** Returns all available queues & amount of messages in each queue
- **Response:**

```bash
{
    "status": "success",
    "data": [
        {
            "queueName": "queue 1",
            "messageCount": 0,
            "createdAt": "2024-09-29T16:15:41.061Z",
            "uuid": "6daf560c-6b76-47e2-a708-ec3c26452645"
        }
    ]
}
```

### `GET /api/v1/queues/{queue_name}`

- **Description:**
- **Response:**

```bash
{
    "status": "success",
    "message": "Queue 1 message"
}
```

### `GET /api/v1/queues/{queue_name}?timeout=10000`

- **Description:**
- **Response:**

```bash
{
    "status": "success",
    "message": "Queue 1 message"
}
```

### `POST /api/v1/queues/{queue_name}`

- **Description:**
- **Request Body:**

```bash
{
    "message": "Second item"
}
```

- **Response:**

```bash
{
    "status": "success",
    "details": "A new queue {queue_name} was created",
    "message": "Second item"
}
```

### `DELETE /api/v1/queues/{queue_name}`

- **Description:**
- **Response:**

```bash
{
    "status": "success",
    "details": "Queue {queue_name} has been deleted successfully"
}
```

## Authors

- [@zivab](https://github.com/zivab)
