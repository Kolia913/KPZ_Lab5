"use client";
import { useDepartments } from "@/hooks/query/departments/useDepartments";
import { useState } from "react";
import DepartmentList from "@/components/Department/DepartmentList";
import DepartmentForm from "@/components/Department/DepartmentForm";
import AppCreateButton from "@/components/general/AppCreateButton";

export default function Departments() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const { departments, setId, departmentDetails } = useDepartments();

  function onDepartmentEdit(id: number) {
    setId(id);
  }
  function closeDepartmentForm() {
    setId(null);
    setIsCreateModalOpen(false);
  }
  return (
    <main className="flex flex-col justify-start items-center">
      <div className="container pb-8">
        {departments?.length && (
          <DepartmentList
            departments={departments}
            onDepartmentEdit={onDepartmentEdit}
          />
        )}
      </div>
      {(departmentDetails || isCreateModalOpen) && (
        <DepartmentForm
          department={departmentDetails ? departmentDetails : undefined}
          onClose={closeDepartmentForm}
        />
      )}
      <AppCreateButton onClick={() => setIsCreateModalOpen(true)} />
    </main>
  );
}
