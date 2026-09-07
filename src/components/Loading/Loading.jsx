'use client';

import clsx from 'clsx';
import * as styles from './Loading.css.js';

function Loading({ className, variant = '', title = '', description = '' }) {
  const variantClass = variant === 'big' ? styles.big : undefined;
  const titleClass = variant === 'big' ? styles.titleBig : undefined;
  const descriptionClass =
    variant === 'big' ? styles.descriptionBig : undefined;

  return (
    <div className={clsx(styles.loading, variantClass, className)}>
      <h2 className={clsx(styles.title, titleClass)}>{title}</h2>
      <p className={clsx(styles.description, descriptionClass)}>
        {description}
      </p>
    </div>
  );
}

export default Loading;
