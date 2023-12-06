"use client";
import React, { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

interface AppCreateButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {}

export default function AppCreateButton({ ...props }: AppCreateButtonProps) {
  return (
    <button
      className="fixed right-8 bottom-8 w-16 h-16 rounded-full bg-blue-500 flex justify-center items-center p-3 add-btn z-10"
      {...props}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        stroke="#ffffff"
      >
        <g strokeWidth="0"></g>
        <g strokeLinecap="round" strokeLinejoin="round"></g>
        <g>
          {" "}
          <path
            d="M4 12H20M12 4V20"
            stroke="#ffffff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>{" "}
        </g>
      </svg>
    </button>
  );
}
