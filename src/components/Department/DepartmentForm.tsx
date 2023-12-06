import AppButton from "../general/AppButton";
import { Department } from "@/interfaces/Department";
import { useFormik } from "formik";
import * as Yup from "yup";
import classNames from "classnames";
import { useState } from "react";
import { useDepartments } from "@/hooks/query/departments/useDepartments";
import dayjs from "dayjs";

const departmentFormSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .required("This field is required")
    .min(2, "Enter at least 2 letters")
    .max(100, "You reached limit of 100 letters")
    .matches(/^[a-zA-Z\s]*$/, {
      message: "This field should contain only letters [A-Za-z]",
    }),
});

interface EmployeeEditProps {
  department?: Department;
  onClose: () => void;
}

export default function EmployeeForm({
  department,
  onClose,
}: EmployeeEditProps) {
  const { editDepartment, addDepartment, removeDepartment } = useDepartments();
  const [isDeleteConfigOpen, setIsDeleteConfirmOpen] = useState<boolean>(false);
  const departmentFormik = useFormik<Partial<Department>>({
    validationSchema: departmentFormSchema,
    initialValues: {
      name: department?.name || "",
    },
    onSubmit(values: Partial<Department>, { resetForm }) {
      if (department) {
        const payload: Partial<Department> = {
          id: department.id,
          ...values,
        };
        editDepartment({ id: department.id, data: payload as Department });
      } else {
        const payload: Partial<Department> = {
          ...values,
        };
        addDepartment(payload as Department);
        resetForm();
      }
    },
  });
  function deleteDepartment() {
    if (department) {
      removeDepartment(department.id);
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
          {department ? (
            <h1 className="font-bold text-xl mb-6 mt-2">
              Edit: {department.name} department
            </h1>
          ) : (
            <h1 className="font-bold text-xl mb-6 mt-2">
              Create new department
            </h1>
          )}
          <form
            className="flex flex-col justify-start items-start gap-4 w-full"
            onSubmit={departmentFormik.handleSubmit}
          >
            <div className="flex justify-center items-start gap-4 w-full">
              <label className="flex flex-col justify-start items-start">
                Name:
                <input
                  className={classNames(
                    "rounded-lg border border-solid border-gray-200 py-1 px-2 bg-gray-50 w-72 h-9 focus:border-blue-400",
                    departmentFormik.touched.name &&
                      departmentFormik.errors.name &&
                      "border-red-500"
                  )}
                  {...departmentFormik.getFieldProps("name")}
                />
                {departmentFormik.touched.name &&
                  departmentFormik.errors.name && (
                    <span className="text-xs font-light text-red-500">
                      {departmentFormik.errors.name}
                    </span>
                  )}
              </label>
            </div>
            {department ? (
              <div className="flex justify-between items-center w-full mt-6">
                <div className="flex flex-col justify-start gap-1 text-sm text-gray-500 italic">
                  <span>Created At:</span>
                  <span>
                    {dayjs(department.createdAt).format("DD.MM.YYYY HH:mm")}
                  </span>
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
      {isDeleteConfigOpen && department && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/20 flex justify-center items-center z-30">
          <div className="bg-white border border-gray-300 shadow-lg rounded-xl w-fit p-8 flex flex-col justify-center items-center relative flex-wrap">
            <h1 className="font-bold text-xl mb-6 mt-2">
              Delete department: {department.name}?
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
                onPress={deleteDepartment}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
