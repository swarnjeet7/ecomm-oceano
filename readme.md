# Ecomm Oceano 🌊

A modern full-stack e-commerce application built for beginners learning full-stack development. This project demonstrates microservices architecture with a powerful backend and modern frontend technologies.

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## 🌟 Overview

Ecomm Oceano is a comprehensive e-commerce platform designed to help developers understand modern full-stack development practices. The application features a microservices backend architecture with Node.js, Express.js, TypeScript, MySQL for data persistence, and a Next.js frontend with micro-frontend architecture.

## 🛠 Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **TypeScript** - Type-safe JavaScript
- **MySQL** - Relational database
- **mysql2** - MySQL client for Node.js
- **Microservices** - Distributed architecture

### Frontend
- **Next.js** - React framework
- **React** - UI library
- **Micro Frontend** - Modular frontend architecture

## ✨ Features

- [ ] User authentication and authorization
- [ ] Product catalog management
- [ ] Shopping cart functionality
- [ ] Order management system
- [ ] Payment integration
- [ ] Admin dashboard
- [ ] Responsive design
- [ ] Search and filtering
- [ ] User reviews and ratings
- [ ] Inventory management

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MySQL** (v8.0 or higher)
- **TypeScript** (v5.0 or higher)
- **Git**

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/swarnjeet7/ecomm-oceano.git
   cd ecomm-oceano
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   yarn install
   
   # Install backend dependencies
   cd backend
   yarn install
   ```

3. **Set up MySQL database**
   ```bash
   # Login to MySQL
   mysql -u root -p
   
   # Create database
   CREATE DATABASE oceano;
   
   # Create a user (optional)
   CREATE USER 'oceano_user'@'localhost' IDENTIFIED BY 'your_password';
   GRANT ALL PRIVILEGES ON oceano.* TO 'oceano_user'@'localhost';
   FLUSH PRIVILEGES;
   ```

4. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Update the `.env` file with your MySQL configuration:
   ```env
   # Database Configuration
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=oceano
   DB_PORT=3306
   
   # Server Configuration
   PORT=5000
   NODE_ENV=development
   
   # Security (for future JWT implementation)
   JWT_SECRET=your_jwt_secret_key_here
   JWT_EXPIRES_IN=24h
   
   # CORS Configuration (optional)
   ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
   ```

5. **Build and start the development server**
   ```bash
   # Development mode with TypeScript
   yarn dev
   
   # Or build and run production
   yarn build
   yarn start
   ```

## 🎯 Usage

1. **Start the backend server (Development)**
   ```bash
   yarn dev
   # or
   cd backend && yarn dev
   ```

2. **Build for production**
   ```bash
   yarn build
   # or
   cd backend && yarn build
   ```

3. **Start production server**
   ```bash
   yarn start
   # or
   cd backend && yarn start
   ```

4. **Access the application**
   - Backend API: `http://localhost:5000`
   - Health Check: `http://localhost:5000/health`

5. **Frontend (when implemented)**
   - Frontend: `http://localhost:3000`

6. **Admin Panel (when implemented)**
   - Access: `http://localhost:3000/admin`

## 📁 Project Structure

```
ecomm-oceano/
├── backend/
│   ├── src/
│   │   ├── index.ts          # Main TypeScript entry point
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── types/            # TypeScript type definitions
│   │   └── utils/
│   ├── dist/                 # Compiled JavaScript output
│   ├── tsconfig.json         # TypeScript configuration
│   └── package.json
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── styles/
│   ├── utils/
│   ├── public/
│   └── package.json
├── docs/
├── tests/
├── README.md
└── .env.example
```

## 📚 API Documentation

### Base URL
```
http://localhost:5000
```

### Authentication Endpoints

#### User Registration
- **POST** `/user/register`
- **Description**: Register a new user account
- **Request Body**:
  ```json
  {
    "fullname": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Success Response** (201):
  ```json
  {
    "success": true,
    "message": "User registered successfully!",
    "data": {
      "id": 1,
      "fullname": "John Doe",
      "email": "john@example.com",
      "created_at": "2025-09-21T17:15:03.000Z"
    }
  }
  ```
- **Error Responses**:
  - `400`: Missing required fields or invalid email format
  - `409`: User with email already exists
  - `500`: Internal server error

#### User Login
- **POST** `/user/login`
- **Description**: Authenticate user and login
- **Request Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Success Response** (200):
  ```json
  {
    "success": true,
    "message": "Login successful!",
    "data": {
      "id": 1,
      "fullname": "John Doe",
      "email": "john@example.com",
      "created_at": "2025-09-21T17:15:03.000Z"
    }
  }
  ```
- **Error Responses**:
  - `400`: Missing required fields or invalid email format
  - `401`: Invalid email or password
  - `500`: Internal server error

### System Endpoints

#### Health Check
- **GET** `/health`
- **Description**: Check server and database connectivity status
- **Success Response** (200):
  ```json
  {
    "status": "healthy",
    "database": "connected",
    "typescript": true,
    "timestamp": "2025-09-21T17:15:03.000Z"
  }
  ```

#### Server Info
- **GET** `/`
- **Description**: Basic server information
- **Success Response** (200):
  ```json
  {
    "message": "Hello World from Node.js with MySQL and TypeScript!",
    "database": "MySQL",
    "status": "Server is running",
    "typescript": true
  }
  ```

### Future Endpoints (To be implemented)
- `POST /user/logout` - User logout
- `GET /user/profile` - Get user profile
- `PUT /user/profile` - Update user profile
- `GET /products` - Get all products
- `POST /products` - Create new product (Admin)
- `GET /orders` - Get user orders
- `POST /orders` - Create new order

For detailed API testing, you can use tools like Postman, Insomnia, or curl commands.

## 🗄️ Database Schema

### Users Table
```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  fullname VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## 🧪 Testing

Run the test suite:

```bash
# Run all tests
yarn test

# Run tests in watch mode
yarn test:watch

# Run tests with coverage
yarn test:coverage
```

## 🚀 Deployment

### Using Docker

1. **Build the Docker image**
   ```bash
   docker build -t ecomm-oceano .
   ```

2. **Run with Docker Compose (with MySQL)**
   ```bash
   docker-compose up -d
   ```

### Using PM2

1. **Install PM2**
   ```bash
   yarn global add pm2
   ```

2. **Start the application**
   ```bash
   pm2 start ecosystem.config.js
   ```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

**Swarnjeet Singh**
- GitHub: [@swarnjeet7](https://github.com/swarnjeet7)
- Project Link: [https://github.com/swarnjeet7/ecomm-oceano](https://github.com/swarnjeet7/ecomm-oceano)

## 🙏 Acknowledgments

- Thanks to all contributors who helped build this project
- Inspired by modern e-commerce platforms
- Built for educational purposes to help developers learn full-stack development

---

⭐ If you found this project helpful, please give it a star on GitHub!