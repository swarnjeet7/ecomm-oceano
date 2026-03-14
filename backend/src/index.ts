import express from "express";
import type { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import mysql from "mysql2/promise";
import userRouter from "./routes/user";

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
  database: process.env.DB_NAME || "oceano",
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

app.use("/user", userRouter);

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
