import { InputHTMLAttributes } from "react";

type InputProps = {
  label: string;
} & InputHTMLAttributes<HTMLInputElement>;

export default function Input({ label, ...restProps }: InputProps) {
  return (
    <label>
      {label}
      <input {...restProps} />
    </label>
  );
}
