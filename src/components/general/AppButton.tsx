"use client";
import classNames from "classnames";
import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

interface AppButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  onPress?: () => void;
  varaint: "create" | "update" | "delete" | "default" | "outline";
  text: string;
}

export default function AppButton({
  onPress,
  varaint = "default",
  text,
  ...props
}: AppButtonProps) {
  const onButtonPress = () => {
    onPress && onPress();
  };
  return (
    <button
      onClick={onButtonPress}
      className={classNames(
        "px-4 py-2 rounded-md duration-200",
        varaint === "default" && "bg-blue-500 text-white hover:bg-blue-600",
        varaint === "update" && "bg-yellow-500 text-white hover:bg-yellow-600",
        varaint === "delete" && "bg-red-500 text-white hover:bg-red-600",
        varaint === "create" && "bg-green-500 text-white hover:bg-green-600",
        varaint === "outline" &&
          "bg-white text-black border border-solid border-black hover:bg-gray-100"
      )}
      {...props}
    >
      {text}
    </button>
  );
}
