# User Management API

A RESTful API for managing users built with Node.js, Express, and MongoDB. This API provides complete CRUD operations with input validation and error handling.

## Features

- ✅ Complete REST API with proper HTTP status codes
- ✅ Input validation using Joi
- ✅ Pagination support for user listing
- ✅ Global error handling
- ✅ MongoDB integration with Mongoose
- ✅ Environment configuration with dotenv

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** (Node Package Manager)
- **MongoDB** (local or MongoDB Atlas connection string)

## Installation

### 1. Clone or extract the project

```bash
cd user-management-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory and add:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/user-management
```

**For MongoDB Atlas:**

```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database-name
```

## Running the Application

### Development Mode (with auto-restart on file changes)

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

The server will run on `http://localhost:5000`

## API Endpoints

### 1. Create User

**POST** `/users`

Request body:

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "address": "123 Main Street",
  "phoneNumber": "1234567890",
  "age": 30
}
```

Response (201 Created):

```json
{
  "_id": "507f1f77bcf86cd799439011",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "address": "123 Main Street",
  "phoneNumber": "1234567890",
  "age": 30,
  "createdAt": "2024-04-20T10:00:00.000Z",
  "updatedAt": "2024-04-20T10:00:00.000Z"
}
```

### 2. Get All Users (with Pagination)

**GET** `/users?page=1`

Response (200 OK):

```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "address": "123 Main Street",
    "phoneNumber": "1234567890",
    "age": 30,
    "createdAt": "2024-04-20T10:00:00.000Z",
    "updatedAt": "2024-04-20T10:00:00.000Z"
  }
]
```

**Query Parameters:**

- `page` (optional): Page number (default: 1)
- Limit: 5 users per page

### 3. Get User by ID

**GET** `/users/:id`

Response (200 OK):

```json
{
  "_id": "507f1f77bcf86cd799439011",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "address": "123 Main Street",
  "phoneNumber": "1234567890",
  "age": 30,
  "createdAt": "2024-04-20T10:00:00.000Z",
  "updatedAt": "2024-04-20T10:00:00.000Z"
}
```

Error Response (404 Not Found):

```json
{
  "message": "User not found"
}
```

### 4. Delete User

**DELETE** `/users/:id`

Response (200 OK):

```json
{
  "message": "User deleted"
}
```

Error Response (404 Not Found):

```json
{
  "message": "User not found"
}
```

## Input Validation

All fields are validated using Joi:

| Field       | Type   | Requirements                 |
| ----------- | ------ | ---------------------------- |
| firstName   | String | Required, 2-50 characters    |
| lastName    | String | Required, 2-50 characters    |
| email       | String | Required, valid email format |
| address     | String | Required, 5-100 characters   |
| phoneNumber | String | Required, 10-15 digits       |
| age         | Number | Optional, 0-120 range        |

**Validation Error Response (400 Bad Request):**

```json
{
  "message": "Validation error",
  "errors": [
    {
      "field": "firstName",
      "message": "First name must be at least 2 characters"
    }
  ]
}
```

## Project Structure

```
user-management-api/
├── config/
│   └── db.js              # MongoDB connection
├── controllers/
│   └── userController.js  # API business logic
├── middleware/
│   ├── errorHandler.js    # Global error handling
│   └── validateMiddleware.js # Input validation
├── models/
│   └── userModel.js       # User schema
├── routes/
│   └── userRoutes.js      # API routes
├── server.js              # Express app setup
├── package.json           # Dependencies
├── .env                   # Environment variables
└── README.md              # Documentation
```

## Error Handling

The API returns appropriate HTTP status codes:

- **200 OK** - Successful GET, DELETE operations
- **201 Created** - Successful POST operation
- **400 Bad Request** - Invalid input or invalid ID format
- **404 Not Found** - User not found
- **500 Internal Server Error** - Server errors

## Testing with Postman

### Import Collection

1. Create new requests with the endpoints above
2. Set the request method (POST, GET, DELETE)
3. Add request body for POST requests
4. Send the request

### Example Requests

**Create User:**

```
POST http://localhost:5000/users
Content-Type: application/json

{
  "firstName": "Jane",
  "lastName": "Smith",
  "email": "jane@example.com",
  "address": "456 Oak Avenue",
  "phoneNumber": "9876543210",
  "age": 28
}
```

**Get All Users (Page 1):**

```
GET http://localhost:5000/users?page=1
```

**Get User by ID:**

```
GET http://localhost:5000/users/507f1f77bcf86cd799439011
```

**Delete User:**

```
DELETE http://localhost:5000/users/507f1f77bcf86cd799439011
```

## Troubleshooting

### "Cannot find module 'express'"

```bash
npm install
```

### "Cannot connect to MongoDB"

- Ensure MongoDB is running
- Check your MONGO_URI in .env file
- If using MongoDB Atlas, ensure IP whitelist includes your connection

### Port already in use

Change the PORT in your .env file or use:

```bash
PORT=3000 npm run dev
```

## Dependencies

- **express** - Web framework
- **mongoose** - MongoDB ODM
- **dotenv** - Environment variables
- **joi** - Input validation
- **nodemon** - Auto-reload during development (dev only)

## License

This project is open source and available under the MIT License.

## Support

For issues or questions, please check the error messages and ensure:

1. All dependencies are installed (`npm install`)
2. MongoDB is running and accessible
3. .env file is properly configured
4. All required fields are provided in requests
