import { InputHTMLAttributes } from "react";

export type HTMLCheckboxElement = Required<Pick<InputHTMLAttributes<HTMLInputElement>, 'checked'>>