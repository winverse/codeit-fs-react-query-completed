'use client';

import clsx from 'clsx';
import * as styles from './Button.css.js';

function Button({ as: Component = 'button', className, ...restProps }) {
  return (
    <Component {...restProps} className={clsx(styles.button, className)} />
  );
}

export default Button;
