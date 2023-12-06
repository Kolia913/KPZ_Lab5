"use client";
import React from "react";
import { Department } from "@/interfaces/Department";
import dayjs from "dayjs";

interface DepartmentProps {
  department: Department;
  onDepartmentEdit: (id: number) => void;
}

export default function DepartmentCard({
  department,
  onDepartmentEdit,
}: DepartmentProps) {
  const editDepartment = () => {
    onDepartmentEdit(department.id);
  };

  return (
    <div
      className="p-4 flex flex-col justify-center items-start gap-2 border bg-gray-50 rounded-md w-80 h-60 cursor-pointer shadow-sm"
      onClick={editDepartment}
    >
      <span className="text-3xl max-w-full whitespace-nowrap overflow-hidden text-ellipsis">
        {department.name}
      </span>
      <p className="text-sm">
        Crated at: {dayjs(department.createdAt).format("DD.MM.YYYY HH:mm")}
      </p>
    </div>
  );
}
