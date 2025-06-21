# Kutaisi Restaurant Lister

A simple full-stack web application that lists local restaurants in Kutaisi, Georgia. This project demonstrates the flow of data from a Node.js/Express backend API to a React/TypeScript frontend.

## Features

-   **Dynamic Data Display**: Fetches a list of restaurants from a custom backend API on page load.
-   **Simulated API**: Uses a Node.js server to provide a static JSON data source, mimicking a real-world API.
-   **Client-Side Filtering**: Instantly search and filter the list of restaurants by name or cuisine type.
-   **Type-Safe Code**: Built entirely with TypeScript for both frontend and backend to ensure data integrity and improve developer experience.
-   **Modern Tooling**: Utilizes Vite for a fast and efficient frontend development workflow.

## Tech Stack

-   **Backend**: Node.js, Express.js, TypeScript
-   **Frontend**: React, TypeScript, Vite, Axios
-   **Styling**: Plain CSS

## Project Structure

This project uses a monorepo structure to keep the frontend and backend code organized within a single repository.

```
/
├── backend/         # Node.js + Express + TypeScript API
│   ├── src/
│   ├── package.json
│   └── tsconfig.json
├── frontend/        # React + Vite + TypeScript Client
│   ├── src/
│   ├── package.json
│   └── tsconfig.json
├── .gitignore
└── README.md
```

## Setup and Installation

### Prerequisites

-   Node.js (v16 or higher)
-   npm (v8 or higher)
-   Git

### Installation Steps

1.  **Clone the repository:**
    ```bash
    git clone <your-repo-url>
    cd kutaisi-restaurant-lister
    ```

2.  **Install backend dependencies:**
    ```bash
    cd backend
    npm install
    ```

3.  **Install frontend dependencies:**
    ```bash
    cd ../frontend
    npm install
    ```

## Running the Application

You need to run both the backend and frontend servers in separate terminal windows.

1.  **Start the Backend Server:**
    (From the `/backend` directory)
    ```bash
    npm run dev
    ```
    The API will be available at `http://localhost:5000`.

2.  **Start the Frontend Application:**
    (From the `/frontend` directory)
    ```bash
    npm run dev
    ```
    The application will open automatically in your browser, usually at `http://localhost:5173`.

## API Endpoint

-   **`GET /api/restaurants`**
    -   **Description**: Retrieves the complete list of restaurants.
    -   **Response**: A JSON array of `Restaurant` objects.
    -   **Restaurant Object Structure**:
        ```ts
        interface Restaurant {
          id: number;
          name: string;
          cuisine: string;
          address: string;
          rating: number; // 1-5
          description: string;
          imageUrl: string;
        }
        ```