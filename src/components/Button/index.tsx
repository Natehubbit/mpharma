import { ButtonHTMLAttributes, FC } from "react";

import style from "./style.module.scss";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button className={style.container} {...props}>
      {children}
    </button>
  );
};

export default Button;
