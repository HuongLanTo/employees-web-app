import Employee from '../models/employee';

export const getEmployees = async (page: number, limit: number) => {
  return Employee.findAndCountAll({ offset: (page - 1) * limit, limit });
};

export const createEmployee = async (employeeData: any) => {
  console.log('test', employeeData);
  
  return Employee.create(employeeData);
};

export const updateEmployee = async (id: number, employeeData: any) => {
  return Employee.update(employeeData, { where: { id } });
};

export const deleteEmployee = async (id: number) => {
  return Employee.destroy({ where: { id } });
};
