import React, { FC } from "react";
import {
  CheckCircleIcon,
  XCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/20/solid";

interface CustomMessageProps {
  type: "success" | "error" | "info" | "custom";
  message: string;
  customText?: string;
}

const CustomMessage: FC<CustomMessageProps> = ({
  type,
  message,
  customText,
}) => {
  const getStyles = () => {
    switch (type) {
      case "success":
        return "text-green-700 bg-green-300/60 dark:bg-green-200 dark:text-green-800";
      case "error":
        return "text-red-700 bg-red-300/60 dark:bg-red-200 dark:text-red-800";
      case "info":
        return "text-blue-700 bg-blue-300/60 dark:bg-blue-200 dark:text-blue-800";
      case "custom":
        return "text-yellow-700 bg-yellow-300/60 dark:bg-yellow-200 dark:text-yellow-800";
      default:
        return "";
    }
  };

  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircleIcon className="w-5 h-5 mr-2" />;
      case "error":
        return <XCircleIcon className="w-5 h-5 mr-2" />;
      case "info":
        return <InformationCircleIcon className="w-5 h-5 mr-2" />;
      case "custom":
        return <span className="font-bold">{customText}</span>;
      default:
        return null;
    }
  };

  return (
    <div
      className={`relative mb-4 flex items-center p-4 text-sm ${getStyles()}`}
      role="alert"
    >
      {getIcon()}
      <div>
        <span className="font-medium">{message}</span>
      </div>
    </div>
  );
};

export default CustomMessage;
