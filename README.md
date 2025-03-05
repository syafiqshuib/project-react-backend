# Todo GraphQL API with Apollo Server and PostgreSQL

This project is a simple Todo API built using Apollo Server, Sequelize, and PostgreSQL.

## Prerequisites
Make sure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (LTS recommended)
- [PostgreSQL](https://www.postgresql.org/download/)

## Setup Instructions

### 1. Create a PostgreSQL Database and User

1. Open your PostgreSQL terminal (psql) and execute the following commands:
    ```sql
    CREATE DATABASE todo_db;
    CREATE USER myuser WITH ENCRYPTED PASSWORD 'password';
    ALTER ROLE myuser SET client_encoding TO 'utf8';
    ALTER ROLE myuser SET default_transaction_isolation TO 'read committed';
    ALTER ROLE myuser SET timezone TO 'UTC';
    GRANT ALL PRIVILEGES ON DATABASE todo_db TO myuser;
    ```

### 2. Clone the Repository
```sh
git clone https://github.com/syafiqshuib/project-react-backend.git
cd project-react-backend
```

### 3. Install Dependencies
```sh
npm install
```

### 4. Configure Database Connection
Ensure that your database connection URL in the code is correct:
```ts
const sequelize = new Sequelize("postgres://myuser:password@localhost:5432/todo_db");
```
Modify `myuser`, `password`, and `todo_db` as needed.

### 5. Run the Server
```sh
npm start
```

### 6. Test the API
Once the server starts successfully, it will be running at:
```
http://localhost:4000
```

You can test GraphQL queries using Apollo Sandbox or Postman.

## Folder Structure
```
PROJECT-REACT-BACKEND
├── dist                # Compiled JavaScript files (after build)
├── node_modules        # Dependencies installed via npm
├── src                 # Source code directory
│   ├── index.ts        # Main entry point of the server
├── package-lock.json   # Auto-generated lock file for npm dependencies
├── package.json        # Project configuration and dependencies
├── README.md           # Project documentation
├── tsconfig.json       # TypeScript configuration file
```

## Available Queries and Mutations

### Queries
```graphql
query GetAllTodos {
  lists {
    id
    task
    completed
  }
}
```

```graphql
query SearchTodo($task: String!) {
  searchList(task: $task) {
    id
    task
    completed
  }
}
```

### Mutations
```graphql
mutation AddTodo($task: String!) {
  addList(task: $task) {
    id
    task
    completed
  }
}
```

```graphql
mutation UpdateTodoStatus($id: ID!) {
  updateList(id: $id) {
    id
    task
    completed
  }
}
```

```graphql
mutation EditTodoTask($id: ID!, $task: String!) {
  editList(id: $id, task: $task) {
    id
    task
    completed
  }
}
```

```graphql
mutation DeleteTodo($id: ID!) {
  deleteList(id: $id)
}
```

## License
This project is open-source and free to use.

---

Happy coding! 🚀

