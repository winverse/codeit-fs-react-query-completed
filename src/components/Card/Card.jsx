'use client';

import clsx from 'clsx';
import * as styles from './Card.css.js';

function Card({ className, children }) {
  return <div className={clsx(styles.card, className)}>{children}</div>;
}

export default Card;
