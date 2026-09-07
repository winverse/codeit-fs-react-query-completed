import { Navigation } from '@/components/Navigation';
import { AppProviders } from '@/providers';
import * as styles from './GlobalLayout.css.js';

function GlobalLayout({ children }) {
  return (
    <AppProviders>
      <Navigation />
      <main className={styles.main}>{children}</main>
    </AppProviders>
  );
}

export default GlobalLayout;
