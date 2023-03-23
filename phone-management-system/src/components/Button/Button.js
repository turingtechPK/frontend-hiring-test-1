import React from "react";
import { ButtonSpinner } from "./ButtonSpinner";

export function Button({
  type = "button",
  text,
  isLoading = false,
  onClickHandler,
  disabled = false,
  variant = "primary",
  icon = null,
  buttonRef = null,
  className,
}) {
  return (
    <>
      <button
        ref={buttonRef}
        type={type}
        className={`${
          variant === "primary"
            ? `${
                disabled
                  ? `rounded-lg border border-gray-300 bg-gray-200 px-5 py-2 mr-2 mb-2 text-sm font-medium text-gray-500 shadow-sm cursor-not-allowed ${className}`
                  : `rounded-lg px-5 py-2 mr-2 mb-2 flex justify-center items-center bg-blue-700 text-white 
                    } shadow cursor-pointer hover:scale-95 ${className}`
              }`
            : ""
        }`}
        disabled={disabled}
        onClick={onClickHandler}
      >
        {isLoading ? (
          <div className={`flex text-base justify-center items-center w-full `}>
            {text} <ButtonSpinner disabled={disabled} />
            {icon ? <span className="h-5 w-5 ">{icon} </span> : null}
          </div>
        ) : (
          <div className="flex text-base gap-1 justify-center items-center">
            {icon ? <span className="h-5 w-5 ">{icon} </span> : null}
            {text}
          </div>
        )}
      </button>
    </>
  );
}
