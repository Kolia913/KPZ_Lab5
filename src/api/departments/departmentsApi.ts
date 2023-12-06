import { Department } from "@/interfaces/Department";
import { httpClient } from "@/utils/HttpClient";

export async function getAllDepartments(): Promise<Department[]> {
  const response = await httpClient.get<Department[]>("departments");
  return response.data;
}

export async function getDeparment(id: number): Promise<Department> {
  const response = await httpClient.get<Department>(`departments/${id}`);
  return response.data;
}

export async function createDepartment(data: Department): Promise<Department> {
  const response = await httpClient.post<Department>("departments", data);
  return response.data;
}

export async function updateDepartment(
  id: number,
  data: Department
): Promise<void> {
  await httpClient.put<Department>(`departments/${id}`, data);
}

export async function deleteDepartment(id: number): Promise<void> {
  await httpClient.delete<void>(`departments/${id}`);
}
