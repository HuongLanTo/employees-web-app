import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

interface EmployeeFormProps {
  currentEmployee: any | null;
  onClose: () => void;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({
  currentEmployee,
  onClose,
}) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState<number | "">("");
  const [address, setAddress] = useState("");
  const [picture, setPicture] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    if (currentEmployee) {
      setName(currentEmployee.name);
      setAge(currentEmployee.age);
      setAddress(currentEmployee.address);
      setPicture(currentEmployee.picture);
    }
  }, [currentEmployee]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const employeeData = { name, age, address, picture };

    try {
      if (currentEmployee) {
        await axios.put(
          `${process.env.REACT_APP_API_URL}/employees/${currentEmployee.id}`,
          employeeData,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
      } else {
        console.log("employees", employeeData);

        await axios.post(
          `${process.env.REACT_APP_API_URL}/employees`,
          employeeData,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
      }
      onClose();
    } catch (error: any) {
      alert(error.response?.data?.message || "Operation failed");
    }
  };

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>
        {currentEmployee ? "Edit Employee" : "Add Employee"}
      </DialogTitle>
      <DialogContent>
        <form>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Age"
            variant="outlined"
            type="number"
            fullWidth
            required
            margin="normal"
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
          />
          <TextField
            label="Address"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <TextField
            label="Picture URL"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            value={picture}
            onChange={(e) => setPicture(e.target.value)}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          {currentEmployee ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EmployeeForm;
