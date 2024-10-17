import { Router } from "express";
import {
  getEmployeeList,
  createNewEmployee,
  updateEmployeeDetails,
  removeEmployee,
} from "../controllers/employeeController";
import { authenticateJWT } from "../middlewares/authMiddleware";

const router = Router();

router.get("/", authenticateJWT as any, getEmployeeList);

router.post("/", authenticateJWT as any, createNewEmployee);

router.put("/:id", authenticateJWT as any, updateEmployeeDetails);

router.delete("/:id", authenticateJWT as any, removeEmployee);

export default router;
