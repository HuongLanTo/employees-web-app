import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  Box,
  Typography,
} from "@mui/material";
import axios from "axios";
import EmployeeForm from "./EmployeeForm";
import { useAuth } from "../../context/AuthContext";

interface Employee {
  id: number;
  name: string;
  age: number;
  address: string;
  picture: string;
}

const EmployeeDashboard: React.FC = () => {
  const { user } = useAuth();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [currentEmployee, setCurrentEmployee] = useState<Employee | null>(null);
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const limit = 5;

  const fetchEmployees = async (page: number) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/employees?page=${page}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setEmployees(response.data.rows);
      setTotalPages(Math.ceil(response.data.count / limit));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEmployees(page);
  }, [page]);

  const handleEdit = (employee: Employee) => {
    setCurrentEmployee(employee);
    setOpenForm(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await axios.delete(`${process.env.REACT_APP_API_URL}/employees/${id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        fetchEmployees(page);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleAdd = () => {
    setCurrentEmployee(null);
    setOpenForm(true);
  };

  const handleFormClose = () => {
    setOpenForm(false);
    fetchEmployees(page);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  return (
    <Container>
      <Box
        mt={5}
        mb={3}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h4">Employee Dashboard</Typography>
        <Button variant="contained" color="primary" onClick={handleAdd}>
          Add Employee
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table aria-label="employee table">
          <TableHead>
            <TableRow>
              <TableCell>Picture</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Address</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell>
                  <img
                    src={employee.picture}
                    alt={employee.name}
                    width={50}
                    height={50}
                  />
                </TableCell>
                <TableCell>{employee.name}</TableCell>
                <TableCell>{employee.age}</TableCell>
                <TableCell>{employee.address}</TableCell>
                <TableCell align="right">
                  <Button color="primary" onClick={() => handleEdit(employee)}>
                    Edit
                  </Button>
                  <Button
                    color="secondary"
                    onClick={() => handleDelete(employee.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box mt={3} display="flex" justifyContent="center">
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
      {openForm && (
        <EmployeeForm
          currentEmployee={currentEmployee}
          onClose={handleFormClose}
        />
      )}
    </Container>
  );
};

export default EmployeeDashboard;
