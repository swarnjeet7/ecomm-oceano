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

Ecomm Oceano is a comprehensive e-commerce platform designed to help developers understand modern full-stack development practices. The application features a microservices backend architecture with Node.js and Express.js, MongoDB for data persistence, and a Next.js frontend with micro-frontend architecture.

## 🛠 Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
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

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (local or cloud instance)
- **Git**

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/swarnjeet7/ecomm-oceano.git
   cd ecomm-oceano
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Update the `.env` file with your configuration:
   ```env
   # Database
   MONGODB_URI=mongodb://localhost:27017/ecomm-oceano
   
   # JWT
   JWT_SECRET=your-secret-key
   
   # Server
   PORT=3000
   NODE_ENV=development
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

## 🎯 Usage

1. **Start the application**
   ```bash
   npm start
   ```

2. **Access the application**
   - Frontend: `http://localhost:3000`
   - API: `http://localhost:3000/api`

3. **Admin Panel**
   - Access: `http://localhost:3000/admin`
   - Default credentials: (To be configured)

## 📁 Project Structure

```
ecomm-oceano/
├── backend/
│   ├── services/
│   │   ├── user-service/
│   │   ├── product-service/
│   │   ├── order-service/
│   │   └── payment-service/
│   ├── shared/
│   │   ├── middleware/
│   │   ├── utils/
│   │   └── config/
│   └── gateway/
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── styles/
│   ├── utils/
│   └── public/
├── docs/
├── tests/
├── package.json
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

For detailed API documentation, visit `/api/docs` when the server is running.

## 🧪 Testing

Run the test suite:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 🚀 Deployment

### Using Docker

1. **Build the Docker image**
   ```bash
   docker build -t ecomm-oceano .
   ```

2. **Run the container**
   ```bash
   docker run -p 3000:3000 ecomm-oceano
   ```

### Using PM2

1. **Install PM2**
   ```bash
   npm install -g pm2
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