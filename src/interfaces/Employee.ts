import { Department } from "./Department";

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  address: string;
  departmentId: number;
  salary: number;
  hireDate: string;
  fireDate: string;
  department?: Department;
}
