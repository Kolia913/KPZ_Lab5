import { Employee } from "@/interfaces/Employee";
import { httpClient } from "@/utils/HttpClient";

export async function getAllEmployees(): Promise<Employee[]> {
  const response = await httpClient.get<Employee[]>("/employees");
  return response.data;
}

export async function getEmployee(id: number): Promise<Employee> {
  const response = await httpClient.get<Employee>(`employees/${id}`);
  return response.data;
}

export async function createEmployee(data: Employee): Promise<Employee> {
  const response = await httpClient.post<Employee>("employees", data);
  return response.data;
}

export async function updateEmployee(
  id: number,
  data: Employee
): Promise<void> {
  await httpClient.put<Employee>(`employees/${id}`, data);
}

export async function deleteEmployee(id: number): Promise<void> {
  await httpClient.delete<void>(`employees/${id}`);
}
