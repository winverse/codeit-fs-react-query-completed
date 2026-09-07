'use client';

import clsx from 'clsx';
import * as styles from './Container.css.js';

function Container({ className, children }) {
  return <div className={clsx(styles.container, className)}>{children}</div>;
}

export default Container;
