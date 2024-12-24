# Send Message Service

This project is backend system for send message service, built with ExpressJS and Postgresql

## Table of Contents

1. [Database Schema](#database-schema)
2. [Run the Service](#run-the-service)
3. [API Endpoints](#api-endpoints)

## Database Schema

```
# Database Tables Information

## users Table

This table stores information about users in the application.

| Column Name  | Type        |
|--------------|-------------|
| id           | SERIAL      |
| email        | VARCHAR     |
| first_name   | VARCHAR     |
| last_name    | VARCHAR     |
| birthday     | DATE        |
| is_sent      | BOOLEAN     |
| timezone     | VARCHAR     |

---

```

## Run the Service

### Prerequisites

- Node.js (>=18.x)
- npm (>=9.x)
- Postgresql

### Installation

1. Clone the repository:

```
git clone https://github.com/adsap/send-message-service.git
```

2. Go to the service directory:

```
cd send-message-service
```

3. Install dependencies:

```
npm install
```

3. Create Postgresql database

4. Create .env file (see .env.example file):

5. Run the service:

```
npm run dev
```

## API Endpoints

### Create User

- **Endpoint**: `/api/user`
- **Method**: `POST`
- **Request**:
  - Body
  ```json
  {
    "email": "johndoe@mail.com",
    "first_name": "John",
    "last_name": "Doe",
    "birthday": "2000-12-24"
  }

- **Response**:

  ```json
  {
    "status": "success",
    "message": "User successfully created",
    "result": {
        "id": 1
    }
  }


### Update User

- **Endpoint**: `/api/user/:id`
- **Method**: `PUT`
- **Request**:
  - Body
  ```json
  {
    "birthday": "2000-12-25"
  }
  ```
  - Params
    - id: 1

- **Response**:

  ```json
  {
    "status": "success",
    "message": "User successfully updated",
    "result": {
        "id": 1
    }
  }

### Delete User

- **Endpoint**: `/api/user/:id`
- **Method**: `DELETE`
- **Request**:
  ```
  - Params
    - id: 1

- **Response**:

  ```json
  {
    "status": "success",
    "message": "User successfully deleted",
    "result": {
        "id": 1
    }
  }
  