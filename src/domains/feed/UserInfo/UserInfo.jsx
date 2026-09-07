'use client';

import { ProfilePhoto } from '@/components/ProfilePhoto';
import * as styles from './UserInfo.css.js';

function UserInfo({ name, photo }) {
  return (
    <div className={styles.userInfo}>
      <ProfilePhoto photo={photo} name={name} />
      <div className={styles.userName}>{name}</div>
    </div>
  );
}

export default UserInfo;
