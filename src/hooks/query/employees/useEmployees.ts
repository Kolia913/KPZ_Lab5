import {
  createEmployee,
  deleteEmployee,
  getAllEmployees,
  getEmployee,
  updateEmployee,
} from "@/api/employees/employeesApi";
import { queryKeys } from "@/constants/QueryKeys";
import { Employee } from "@/interfaces/Employee";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";

interface EditEmployeePayload {
  id: number;
  data: Employee;
}

export function useEmployees() {
  const queryClient = useQueryClient();
  const [id, setId] = useState<number | null>(null);

  const { data: employees } = useQuery({
    queryKey: [queryKeys.EMPLOYEES],
    queryFn: getAllEmployees,
  });

  const { data: employeeDetails } = useQuery({
    queryKey: [queryKeys.EMPLOYEES, id],
    queryFn: id ? () => getEmployee(id) : () => null,
  });

  const { mutate: addEmployee } = useMutation({
    mutationFn: createEmployee,
    onSuccess: (data) => {
      toast(
        `Employee ${data.firstName} ${data.lastName} successfully created!`,
        { type: "success" }
      );
      queryClient.invalidateQueries({ queryKey: [queryKeys.EMPLOYEES] });
    },
  });

  const { mutate: editEmployee } = useMutation({
    mutationFn: ({ id, data }: EditEmployeePayload) => updateEmployee(id, data),
    onSuccess: () => {
      toast("Employee successfully updated!", { type: "success" });
      queryClient.invalidateQueries({ queryKey: [queryKeys.EMPLOYEES] });
    },
  });

  const { mutate: removeEmployee } = useMutation({
    mutationFn: deleteEmployee,
    onSuccess: () => {
      toast("Employee successfully deleted!", { type: "success" });
      queryClient.invalidateQueries({ queryKey: [queryKeys.EMPLOYEES] });
    },
  });

  return {
    employees,
    employeeDetails,
    setId,
    addEmployee,
    editEmployee,
    removeEmployee,
  };
}
