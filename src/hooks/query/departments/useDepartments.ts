import {
  createDepartment,
  deleteDepartment,
  getAllDepartments,
  getDeparment,
  updateDepartment,
} from "@/api/departments/departmentsApi";
import { queryKeys } from "@/constants/QueryKeys";
import { Department } from "@/interfaces/Department";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";

interface EditDepartmentPayload {
  id: number;
  data: Department;
}

export function useDepartments() {
  const queryClient = useQueryClient();
  const [id, setId] = useState<number | null>(null);

  const { data: departments } = useQuery({
    queryKey: [queryKeys.DEPARTMENTS],
    queryFn: getAllDepartments,
  });

  const { data: departmentDetails } = useQuery({
    queryKey: [queryKeys.DEPARTMENTS, id],
    queryFn: id ? () => getDeparment(id) : () => null,
  });

  const { mutate: addDepartment } = useMutation({
    mutationFn: createDepartment,
    onSuccess: (data) => {
      toast(`Department ${data.name}  successfully created!`, {
        type: "success",
      });
      queryClient.invalidateQueries({ queryKey: [queryKeys.DEPARTMENTS] });
    },
  });

  const { mutate: editDepartment } = useMutation({
    mutationFn: ({ id, data }: EditDepartmentPayload) =>
      updateDepartment(id, data),
    onSuccess: () => {
      toast("Employee successfully updated!", { type: "success" });
      queryClient.invalidateQueries({ queryKey: [queryKeys.DEPARTMENTS] });
    },
  });

  const { mutate: removeDepartment } = useMutation({
    mutationFn: deleteDepartment,
    onSuccess: () => {
      toast("Department successfully deleted!", { type: "success" });
      queryClient.invalidateQueries({ queryKey: [queryKeys.DEPARTMENTS] });
    },
  });

  return {
    departments,
    departmentDetails,
    setId,
    addDepartment,
    editDepartment,
    removeDepartment,
  };
}
