import express from "express";
import type { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import mysql from "mysql2/promise";
import bcrypt from "bcrypt";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL connection configuration
interface DatabaseConfig {
  host: string;
  user: string;
  password: string;
  database: string;
  port: number;
  waitForConnections: boolean;
  connectionLimit: number;
  queueLimit: number;
}

const dbConfig: DatabaseConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "root@123",
  database: process.env.DB_NAME || "todos",
  port: parseInt(process.env.DB_PORT || "3306"),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

// Create MySQL connection pool
const pool = mysql.createPool(dbConfig);

// Test database connection
async function testConnection(): Promise<void> {
  try {
    const connection = await pool.getConnection();
    console.log("✅ Connected to MySQL database successfully!");
    connection.release();
  } catch (error) {
    console.error(
      "❌ Error connecting to MySQL database:",
      (error as Error).message
    );
  }
}

// Initialize database connection
testConnection();

// Basic route
app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Hello World from Node.js with MySQL and TypeScript!",
    database: "MySQL",
    status: "Server is running",
    typescript: true,
  });
});

// Login endpoint interface
interface LoginRequest {
  email: string;
  password: string;
}

// User login endpoint
app.post(
  "/user/login",
  async (req: Request<{}, {}, LoginRequest>, res: Response) => {
    try {
      const { email, password } = req.body;

      // Basic validation
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: "Email and password are required",
        });
      }

      // TODO: Implement actual user authentication logic
      // For now, just demonstrating bcrypt usage
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      res.json({
        success: true,
        message: "Login endpoint working with TypeScript!",
        data: {
          email,
          hashedPassword: hashedPassword.substring(0, 20) + "...", // Show partial hash for demo
        },
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
);

// Health check route
app.get("/health", async (req: Request, res: Response) => {
  try {
    const connection = await pool.getConnection();
    connection.release();
    res.json({
      status: "healthy",
      database: "connected",
      typescript: true,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      status: "unhealthy",
      database: "disconnected",
      error: (error as Error).message,
      timestamp: new Date().toISOString(),
    });
  }
});

const PORT: number = parseInt(process.env.PORT || "5000");

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📊 Health check available at http://localhost:${PORT}/health`);
  console.log(`🔷 TypeScript enabled!`);
});
