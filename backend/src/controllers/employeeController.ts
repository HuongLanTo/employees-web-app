import { Request, Response } from "express";
import {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../services/employeeService";

export const getEmployeeList = async (req: Request, res: Response) => {
  const { page = 1, limit = 10 } = req.query;
  const employees = await getEmployees(Number(page), Number(limit));
  res.json(employees);
};

export const createNewEmployee = async (req: Request, res: Response) => {
  const employee = await createEmployee(req.body);
  res.status(200).json(employee);
};

export const updateEmployeeDetails = async (req: Request, res: Response) => {
  const updatedEmployee = await updateEmployee(Number(req.params.id), req.body);
  res.json(updatedEmployee);
};

export const removeEmployee = async (req: Request, res: Response) => {
  await deleteEmployee(Number(req.params.id));
  res.sendStatus(200);
};
