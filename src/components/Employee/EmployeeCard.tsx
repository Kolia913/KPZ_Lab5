"use client";
import React from "react";
import { Employee } from "@/interfaces/Employee";

interface EmployeeProps {
  employee: Employee;
  onEmployeeEdit: (id: number) => void;
}

export default function DepartmentCard({
  employee,
  onEmployeeEdit,
}: EmployeeProps) {
  const editEmployee = () => {
    onEmployeeEdit(employee.id);
  };

  return (
    <div
      className="p-4 flex flex-col justify-center items-start gap-2 border bg-gray-50 rounded-md w-80 h-60 cursor-pointer shadow-sm"
      onClick={editEmployee}
    >
      <span className="text-3xl max-w-full whitespace-nowrap overflow-hidden text-ellipsis">
        {employee.firstName + " " + employee.lastName}
      </span>
      <p className="text-sm">
        Email: <span className="italic"> {employee.email}</span>
        <br />
        Phone: <span className="italic">{employee.phoneNumber}</span>
        <br />
        Address: <span className="italic">{employee.address}</span>
      </p>
      <p className="text-sm">
        <span className="text-gray-700 font-bold">Department: </span>
        {employee.department?.name}({employee.hireDate.replaceAll("-", ".")} -{" "}
        {employee.fireDate.replaceAll("-", ".")})
      </p>
      <p>
        Salary: <span className="font-bold">{employee.salary}$</span>
      </p>
    </div>
  );
}
