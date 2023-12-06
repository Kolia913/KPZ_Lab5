import { Department } from "@/interfaces/Department";
import DepartmentCard from "./DepartmentCard";

interface DepartmentListProps {
  departments: Department[];
  onDepartmentEdit: (id: number) => void;
}

export default function DepartmentList({
  departments,
  onDepartmentEdit,
}: DepartmentListProps) {
  return (
    <div className="flex sm:flex-row sm:justify-between flex-col justify-start items-center flex-wrap gap-y-8 gap-x-8">
      {departments.map((department) => (
        <DepartmentCard
          department={department}
          onDepartmentEdit={onDepartmentEdit}
          key={department.id}
        />
      ))}
    </div>
  );
}
