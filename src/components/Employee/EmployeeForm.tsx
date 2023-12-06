import { Employee } from "@/interfaces/Employee";
import AppButton from "../general/AppButton";
import { Department } from "@/interfaces/Department";
import { useFormik } from "formik";
import { useEmployees } from "@/hooks/query/employees/useEmployees";
import * as Yup from "yup";
import classNames from "classnames";
import { useState } from "react";
import dayjs from "dayjs";

const employeeFormSchema = Yup.object().shape({
  firstName: Yup.string()
    .trim()
    .required("This field is required")
    .min(2, "Enter at least 2 letters")
    .max(100, "You reached limit of 100 letters")
    .matches(/^[a-zA-Z\s]*$/, {
      message: "This field should contain only letters [A-Za-z]",
    }),
  lastName: Yup.string()
    .required("This field is required")
    .trim()
    .min(2, "Enter at least 2 letters")
    .max(100, "You reached limit of 100 letters")
    .matches(/^[a-zA-Z\s]*$/, {
      message: "This field should contain only letters [A-Za-z]",
    }),
  email: Yup.string()
    .trim()
    .required("This field is required")
    .email("Please enter valid email"),
  phoneNumber: Yup.string()
    .required("This field is required")
    .trim()
    .matches(/^[0-9]{10}$/, {
      message: "This field must contain only 10 digits",
    }),
  address: Yup.string()
    .trim()
    .required("This field is required")
    .min(2, "Enter at least 2 letters")
    .max(100, "You reached limit of 100 letters"),
  salary: Yup.number()
    .required("This field is required")
    .positive("This field should be positive"),
  departmentId: Yup.number().required("This field is required"),
});

interface EmployeeEditProps {
  employee?: Employee;
  departments: Department[];
  onClose: () => void;
}

export default function EmployeeForm({
  employee,
  departments,
  onClose,
}: EmployeeEditProps) {
  const { editEmployee, addEmployee, removeEmployee } = useEmployees();
  const [isDeleteConfigOpen, setIsDeleteConfirmOpen] = useState<boolean>(false);
  const employeeFormik = useFormik<Partial<Employee>>({
    validationSchema: employeeFormSchema,
    initialValues: {
      firstName: employee?.firstName || "",
      lastName: employee?.lastName || "",
      email: employee?.email || "",
      phoneNumber: employee?.phoneNumber || "",
      address: employee?.address || "",
      salary: employee?.salary || 0,
      departmentId: employee?.departmentId
        ? +employee?.departmentId
        : departments[0].id,
    },
    onSubmit(values: Partial<Employee>, { resetForm }) {
      if (employee) {
        const payload: Employee = {
          ...employee,
          ...values,
          departmentId: values.departmentId
            ? +values.departmentId
            : employee.departmentId,
          department: undefined,
        };
        editEmployee({ id: employee.id, data: payload });
      } else {
        const payload: Partial<Employee> = {
          ...values,
          hireDate: dayjs().format("YYYY-MM-DD"),
          fireDate: dayjs().add(1, "y").format("YYYY-MM-DD"),
        };
        addEmployee(payload as Employee);
        resetForm();
      }
    },
  });
  function deleteEmployee() {
    if (employee) {
      removeEmployee(employee.id);
      setIsDeleteConfirmOpen(false);
      onClose();
    }
  }
  return (
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/20 flex justify-center items-center z-20">
        <div className="bg-white border border-gray-300 shadow-lg rounded-xl max-w-2xl w-full p-4 flex flex-col justify-center items-center relative flex-wrap">
          <div className="absolute right-4 top-4">
            <AppButton onPress={onClose} varaint="outline" text="Close" />
          </div>
          {employee ? (
            <h1 className="font-bold text-xl mb-6 mt-2">
              Edit: {employee.firstName} employee
            </h1>
          ) : (
            <h1 className="font-bold text-xl mb-6 mt-2">Create new employee</h1>
          )}
          <form
            className="flex flex-col justify-start items-start gap-4 w-full"
            onSubmit={employeeFormik.handleSubmit}
          >
            <div className="flex justify-center items-start gap-4 w-full">
              {" "}
              <div className="flex flex-col justify-start items-center gap-y-2 w-full">
                <label className="flex flex-col justify-start items-start">
                  First name:
                  <input
                    className={classNames(
                      "rounded-lg border border-solid border-gray-200 py-1 px-2 bg-gray-50 w-72 h-9 focus:border-blue-400",
                      employeeFormik.touched.firstName &&
                        employeeFormik.errors.firstName &&
                        "border-red-500"
                    )}
                    {...employeeFormik.getFieldProps("firstName")}
                  />
                  {employeeFormik.touched.firstName &&
                    employeeFormik.errors.firstName && (
                      <span className="text-xs font-light text-red-500">
                        {employeeFormik.errors.firstName}
                      </span>
                    )}
                </label>
                <label className="flex flex-col justify-start items-start">
                  Last name:
                  <input
                    className={classNames(
                      "rounded-lg border border-solid border-gray-200 py-1 px-2 bg-gray-50 w-72 h-9 focus:border-blue-400",
                      employeeFormik.touched.lastName &&
                        employeeFormik.errors.lastName &&
                        "border-red-500"
                    )}
                    {...employeeFormik.getFieldProps("lastName")}
                  />
                  {employeeFormik.touched.lastName &&
                    employeeFormik.errors.lastName && (
                      <span className="text-xs font-light text-red-500">
                        {employeeFormik.errors.lastName}
                      </span>
                    )}
                </label>
                <label className="flex flex-col justify-start items-start">
                  Email:
                  <input
                    className={classNames(
                      "rounded-lg border border-solid border-gray-200 py-1 px-2 bg-gray-50 w-72 h-9 focus:border-blue-400",
                      employeeFormik.touched.email &&
                        employeeFormik.errors.email &&
                        "border-red-500"
                    )}
                    {...employeeFormik.getFieldProps("email")}
                  />
                  {employeeFormik.touched.email &&
                    employeeFormik.errors.email && (
                      <span className="text-xs font-light text-red-500">
                        {employeeFormik.errors.email}
                      </span>
                    )}
                </label>
                <label className="flex flex-col justify-start items-start">
                  Phone:
                  <input
                    className={classNames(
                      "rounded-lg border border-solid border-gray-200 py-1 px-2 bg-gray-50 w-72 h-9 focus:border-blue-400",
                      employeeFormik.touched.phoneNumber &&
                        employeeFormik.errors.phoneNumber &&
                        "border-red-500"
                    )}
                    {...employeeFormik.getFieldProps("phoneNumber")}
                  />
                  {employeeFormik.touched.phoneNumber &&
                    employeeFormik.errors.phoneNumber && (
                      <span className="text-xs font-light text-red-500">
                        {employeeFormik.errors.phoneNumber}
                      </span>
                    )}
                </label>
              </div>
              <div className="flex flex-col justify-start items-center gap-y-2 w-full">
                <label className="flex flex-col justify-start items-start">
                  Address:
                  <input
                    className={classNames(
                      "rounded-lg border border-solid border-gray-200 py-1 px-2 bg-gray-50 w-72 h-9 focus:border-blue-400",
                      employeeFormik.touched.address &&
                        employeeFormik.errors.address &&
                        "border-red-500"
                    )}
                    {...employeeFormik.getFieldProps("address")}
                  />
                  {employeeFormik.touched.address &&
                    employeeFormik.errors.address && (
                      <span className="text-xs font-light text-red-500">
                        {employeeFormik.errors.address}
                      </span>
                    )}
                </label>
                <label className="flex flex-col justify-start items-start">
                  Salary:
                  <input
                    type="number"
                    className={classNames(
                      "rounded-lg border border-solid border-gray-200 py-1 px-2 bg-gray-50 w-72 h-9 focus:border-blue-400",
                      employeeFormik.touched.salary &&
                        employeeFormik.errors.salary &&
                        "border-red-500"
                    )}
                    {...employeeFormik.getFieldProps("salary")}
                  />
                  {employeeFormik.touched.salary &&
                    employeeFormik.errors.salary && (
                      <span className="text-xs font-light text-red-500">
                        {employeeFormik.errors.salary}
                      </span>
                    )}
                </label>
                <label className="flex flex-col justify-start items-start">
                  Department:
                  <select
                    className={classNames(
                      "rounded-lg border border-solid border-gray-200 py-1 px-2 bg-gray-50 w-72 h-9 focus:border-blue-400",
                      employeeFormik.touched.departmentId &&
                        employeeFormik.errors.departmentId &&
                        "border-red-500"
                    )}
                    {...employeeFormik.getFieldProps("departmentId")}
                  >
                    {departments.map((item) => (
                      <option
                        value={item.id}
                        key={`${item.id}_${
                          employee?.id ? employee.id : "create"
                        }`}
                      >
                        {item.name}
                      </option>
                    ))}
                  </select>
                  {employeeFormik.touched.departmentId &&
                    employeeFormik.errors.departmentId && (
                      <span className="text-xs font-light text-red-500">
                        {employeeFormik.errors.departmentId}
                      </span>
                    )}
                </label>
              </div>
            </div>
            {employee ? (
              <div className="flex justify-between items-center w-full mt-6">
                <div className="flex flex-col justify-start gap-1 text-sm text-gray-500 italic">
                  <span>Hired: {employee?.hireDate}</span>
                  <span>Fired: {employee?.fireDate}</span>
                </div>
                <div className="flex justify-start items-center gap-2 ">
                  <AppButton varaint="update" text="Update" type="submit" />
                  <AppButton
                    varaint="delete"
                    text="Delete!"
                    onPress={() => setIsDeleteConfirmOpen(true)}
                    type="button"
                  />
                </div>
              </div>
            ) : (
              <div className="flex justify-end items-center w-full mt-6">
                <AppButton varaint="create" text="Create" type="submit" />
              </div>
            )}
          </form>
        </div>
      </div>
      {isDeleteConfigOpen && employee && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/20 flex justify-center items-center z-30">
          <div className="bg-white border border-gray-300 shadow-lg rounded-xl w-fit p-8 flex flex-col justify-center items-center relative flex-wrap">
            <h1 className="font-bold text-xl mb-6 mt-2">
              Delete {employee.firstName + " " + employee.lastName}?
            </h1>
            <div className="flex justify-center gap-10 items-center w-full">
              <AppButton
                varaint="outline"
                text="Cancel"
                onPress={() => setIsDeleteConfirmOpen(false)}
              />
              <AppButton
                varaint="delete"
                text="Delete"
                onPress={deleteEmployee}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
