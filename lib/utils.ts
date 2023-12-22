import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function newCodeGenerator() {
  const codes = [];

  for (let i = 0; i < 10; i++) {
    let code = "";

    for (let j = 0; j < 5; j++) {
      const randomChar = Math.floor(Math.random() * 36).toString(36);
      code += randomChar;
    }

    codes.push(code);
  }

  return codes;
}
