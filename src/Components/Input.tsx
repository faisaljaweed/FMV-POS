import React from "react";

// Define the props for the Input component
interface InputProps {
  id?: string; // Unique identifier for the input
  type?: string; // Input type (e.g., text, email, password)
  label?: string; // Optional label for the input
  placeholder?: string; // Optional placeholder text
  value?: string; // Input value
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // Change handler
  error?: string; // Optional error message
  className?: string; // Optional custom class names
  disabled?: boolean; // Optional disabled state
  required?: boolean; // Optional required state
}

const Input: React.FC<InputProps> = ({
  type,
  label,
  placeholder,
  value,
  onChange,
  error,
  className = "",
  disabled = false,
  required,
  name,
  id,
}) => {
  return (
    <div
      className={` mt-2
     ${className}`}
    >
      {/* Render the label if provided */}
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}

      {/* Input field */}
      <input
        name={name}
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
          error
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:ring-blue-500"
        } ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}`}
        required={required}
      />
      {/* Render the error message if provided */}
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default Input;
