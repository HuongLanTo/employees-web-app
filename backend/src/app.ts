import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import sequelize from "./config/database";
import authRoutes from "./routes/authRoutes";
import employeeRoutes from "./routes/employeeRoutes";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/employees", employeeRoutes);

const PORT = process.env.PORT || 5001;

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Database synchronized successfully");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error synchronizing the database:", error);
  });
