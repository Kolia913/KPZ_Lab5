"use client";
import { useEmployees } from "@/hooks/query/employees/useEmployees";
import EmployeeList from "@/components/Employee/EmployeeList";
import { useDepartments } from "@/hooks/query/departments/useDepartments";
import { useState } from "react";
import EmployeeForm from "@/components/Employee/EmployeeForm";
import AppCreateButton from "@/components/general/AppCreateButton";

export default function Home() {
  const { employees, setId, employeeDetails } = useEmployees();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const { departments } = useDepartments();

  function onEmployeeEdit(id: number) {
    setId(id);
  }
  function closeEmployeeForm() {
    setId(null);
    setIsCreateModalOpen(false);
  }
  return (
    <main className="flex flex-col justify-start items-center">
      <div className="container pb-8">
        {employees?.length && (
          <EmployeeList employees={employees} onEmployeeEdit={onEmployeeEdit} />
        )}
      </div>
      {(employeeDetails || isCreateModalOpen) && (
        <EmployeeForm
          employee={employeeDetails ? employeeDetails : undefined}
          departments={departments ? departments : []}
          onClose={closeEmployeeForm}
        />
      )}
      <AppCreateButton onClick={() => setIsCreateModalOpen(true)} />
    </main>
  );
}
