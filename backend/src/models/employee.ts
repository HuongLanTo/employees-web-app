import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface EmployeeAttributes {
  id: number;
  name: string;
  age: number;
  address: string;
  picture: string;
}

interface EmployeeCreationAttributes extends Optional<EmployeeAttributes, 'id'> {}

class Employee extends Model<EmployeeAttributes, EmployeeCreationAttributes> implements EmployeeAttributes {
  public id!: number; 
  public name!: string; 
  public age!: number; 
  public address!: string; 
  public picture!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Employee.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'employees', 
  }
);

export default Employee;
