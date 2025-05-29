# Grocery Demo API

This is a grocery delivery service API demo, my submission for the Saleswave coding task

## Features

- User authentication and authorization (JWT-based).
- CRUD operations for groceries.
- Simple Cart management.

## Prerequisites

Ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v16 or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/) (running locally or accessible remotely)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Precious-Bob/grocery_demo
   cd grocery_demo
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Environment Variables

Create a `.env` file in the root directory and configure the following variables:

```env
MONGO_URI=mongodb://localhost:27017/grocery_demo
JWT_SECRET=your_jwt_secret
PORT=3000
```

## Running the Application

1. Start the development server:

   ```bash
   npm run start:dev
   ```

2. The API will be available at `http://localhost:3000/`.

## Testing

### Unit Tests

Run unit tests with the following command:

```bash
npm run test
```

### End-to-End Tests

Run end-to-end tests with the following command:

```bash
npm run test:e2e
```

## API Endpoints

### Auth Endpoints

- **POST** `/auth/signup` - Sign up a new user.
- **POST** `/auth/login` - Log in an existing user.

### Grocery Endpoints

- **POST** `/grocery` - Create a new grocery item (protected by JWT).
- **GET** `/grocery` - Retrieve all grocery items.
- **GET** `/grocery/:id` - Retrieve a specific grocery item by ID.
- **PUT** `/grocery/:id` - Update a grocery item by ID (protected by JWT).
- **DELETE** `/grocery/:id` - Delete a grocery item by ID (protected by JWT).

### Cart Endpoints

- **POST** `/cart/items` - Add an item to the cart (protected by JWT).
- **PUT** `/cart/items/:itemId` - Update an item in the cart (protected by JWT).
- **DELETE** `/cart/items/:itemId` - Remove an item from the cart (protected by JWT).
- **GET** `/cart` - Retrieve the cart details (protected by JWT).
