'use client';

import clsx from 'clsx';
import Image from 'next/image';
import * as styles from './Warn.css.js';

const warnIcon = '/assets/warn.svg';

function Warn({ className, variant = '', title = '', description = '' }) {
  const variantClass = variant === 'big' ? styles.big : undefined;
  const titleClass = variant === 'big' ? styles.titleBig : undefined;
  const descriptionClass =
    variant === 'big' ? styles.descriptionBig : undefined;

  return (
    <div className={clsx(styles.warn, variantClass, className)}>
      <Image
        className={styles.icon}
        src={warnIcon}
        alt="경고"
        width={51}
        height={51}
      />
      <h2 className={clsx(styles.title, titleClass)}>{title}</h2>
      <p className={clsx(styles.description, descriptionClass)}>
        {description}
      </p>
    </div>
  );
}

export default Warn;
