import { Dispatch, SetStateAction } from "react";

type ErrorState = { [key: string]: string };

export const validateField = (
  name: string,
  value: string,
  setErrors: Dispatch<SetStateAction<ErrorState>>
) => {
  if (!value) {
    setErrors((prev) => ({ ...prev, [name]: "Este campo es obligatorio" }));
  } else {
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[name];
      return newErrors;
    });
  }
};
