import express from "express";
import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import mysql from "mysql2/promise";

const app = express();

// Database configuration (should match main server config)
const dbConfig = {
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

// User registration interface
interface RegisterRequest {
  fullname: string;
  email: string;
  password: string;
  mobile: number;
  role?: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

// Function to create user table if it doesn't exist
async function createUserTableIfNotExists(): Promise<void> {
  try {
    const connection = await pool.getConnection();

    // Drop existing table to ensure clean schema
    await connection.execute("DROP TABLE IF EXISTS user");
    console.log("🗑️ Dropped existing user table (if any)");

    const createTableQuery = `
      CREATE TABLE user (
        id INT AUTO_INCREMENT PRIMARY KEY,
        fullname VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role ENUM('user', 'distributor', 'admin') DEFAULT 'user',
        mobile VARCHAR(15) NOT NULL,
        isActive BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `;

    await connection.execute(createTableQuery);
    console.log("✅ User table created successfully with correct schema");
    connection.release();
  } catch (error) {
    console.error("❌ Error creating user table:", (error as Error).message);
    throw error;
  }
}

// Initialize table on module load
createUserTableIfNotExists();

// User register endpoint
app.post(
  "/register",
  async (req: Request<{}, {}, RegisterRequest>, res: Response) => {
    try {
      const { fullname, email, password, mobile, role = "user" } = req.body;

      // Basic validation
      if (!fullname || !email || !password || !mobile) {
        return res.status(400).json({
          success: false,
          message: "Fullname, email, password and mobile are required",
        });
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          message: "Please provide a valid email address",
        });
      }

      // Password validation
      if (password.length < 8) {
        return res.status(400).json({
          success: false,
          message: "Password must be at least 8 characters long",
        });
      }

      const connection = await pool.getConnection();

      try {
        // Check if user already exists
        const [existingUsers] = await connection.execute(
          "SELECT id FROM user WHERE email = ?",
          [email]
        );

        if (Array.isArray(existingUsers) && existingUsers.length > 0) {
          return res.status(409).json({
            success: false,
            message: "User with this email already exists",
          });
        }

        // Hash password with 10 rounds
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Insert new user
        const [result] = await connection.execute(
          "INSERT INTO user (fullname, email, password, mobile, role) VALUES (?, ?, ?, ?, ?)",
          [fullname, email, hashedPassword, mobile, role]
        );

        const insertResult = result as mysql.ResultSetHeader;

        res.status(201).json({
          success: true,
          message: "User registered successfully!",
          data: {
            id: insertResult.insertId,
            fullname,
            email,
            mobile,
            created_at: new Date().toISOString(),
          },
        });
      } finally {
        connection.release();
      }
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error during registration",
      });
    }
  }
);

export default app;
