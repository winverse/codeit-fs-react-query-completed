import { Noto_Sans_KR } from 'next/font/google';
import '@/styles/global.css.js';
import 'react-toastify/dist/ReactToastify.css';
import { GlobalLayout } from '@/components/layouts/GlobalLayout';

const notoSans = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--noto-sans',
});

export const metadata = {
  title: '코드스터딧',
  description: 'React Query 실습 프로젝트',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko" className={notoSans.variable}>
      <body>
        <GlobalLayout>{children}</GlobalLayout>
      </body>
    </html>
  );
}
