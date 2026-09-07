'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Container } from '@/components/Container';
import { UserMenu } from '@/components/UserMenu';
import * as styles from './Navigation.css.js';

function Navigation() {
  const pathname = usePathname();

  const isActive = (href) => pathname === href;

  return (
    <div className={styles.nav}>
      <Container className={styles.container}>
        <Link href="/">코드스터딧</Link>
        <ul className={styles.menu}>
          <li className={styles.menuItem}>
            <Link
              href="/"
              className={clsx(
                styles.menuLink,
                isActive('/') && styles.activeLink,
              )}
            >
              홈
            </Link>
          </li>
          <li className={styles.menuItem}>
            <Link
              href="/my-feed"
              className={clsx(
                styles.menuLink,
                isActive('/my-feed') && styles.activeLink,
              )}
            >
              내 피드
            </Link>
          </li>
          <li>
            <UserMenu />
          </li>
        </ul>
      </Container>
    </div>
  );
}

export default Navigation;
