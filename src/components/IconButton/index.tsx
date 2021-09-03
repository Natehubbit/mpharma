import cn from "classnames/bind";
import React, { FC, HTMLAttributes } from "react";

import styles from "./style.module.scss";

const cx = cn.bind(styles);

interface IconButtonProps extends HTMLAttributes<HTMLButtonElement> {
  icon: any;
  mode: "delete" | "edit";
}

const IconButton: FC<IconButtonProps> = ({
  icon,
  mode,
  ...props
}) => {
  return (
    <button
      {...props}
      className={cx({
        container: true,
        [mode]: true,
      })}
    >
      {icon}
    </button>
  );
};

export default IconButton;
