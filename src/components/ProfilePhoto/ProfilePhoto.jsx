'use client';

import Image from 'next/image';
import * as styles from './ProfilePhoto.css.js';

const fallbackPhoto = '/assets/person.png';

function ProfilePhoto({ photo, name }) {
  const src = photo || fallbackPhoto;
  const alt = name || '프로필';

  return (
    <Image
      className={styles.profilePhoto}
      src={src}
      alt={alt}
      width={30}
      height={30}
    />
  );
}

export default ProfilePhoto;
