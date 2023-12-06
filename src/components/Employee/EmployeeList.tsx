import { Employee } from "@/interfaces/Employee";
import EmployeeCard from "./EmployeeCard";

interface EmployeeListProps {
  employees: Employee[];
  onEmployeeEdit: (id: number) => void;
}

export default function EmployeeList({
  employees,
  onEmployeeEdit,
}: EmployeeListProps) {
  return (
    <div className="flex sm:flex-row sm:justify-between flex-col justify-start items-center flex-wrap gap-y-8 gap-x-8">
      {employees.map((employee) => (
        <EmployeeCard
          employee={employee}
          onEmployeeEdit={onEmployeeEdit}
          key={employee.id}
        />
      ))}
    </div>
  );
}
