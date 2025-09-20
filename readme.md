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
   CREATE DATABASE ecomm_oceano;
   
   # Create a user (optional)
   CREATE USER 'ecomm_user'@'localhost' IDENTIFIED BY 'your_password';
   GRANT ALL PRIVILEGES ON ecomm_oceano.* TO 'ecomm_user'@'localhost';
   FLUSH PRIVILEGES;
   ```

4. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Update the `.env` file with your MySQL configuration:
   ```env
   # Database
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=ecomm_oceano
   DB_PORT=3306
   
   # JWT
   JWT_SECRET=your-secret-key
   
   # Server
   PORT=5000
   NODE_ENV=development
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

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Product Endpoints
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create new product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Order Endpoints
- `GET /api/orders` - Get user orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get order by ID
- `PUT /api/orders/:id` - Update order status

### System Endpoints
- `GET /` - Basic server info
- `GET /health` - Health check and database status

For detailed API documentation, visit `/api/docs` when the server is running.

## 🗄️ Database Schema

### Users Table
```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('user', 'admin') DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Products Table
```sql
CREATE TABLE products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  stock_quantity INT DEFAULT 0,
  category_id INT,
  image_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Orders Table
```sql
CREATE TABLE orders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  total_amount DECIMAL(10, 2) NOT NULL,
  status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
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