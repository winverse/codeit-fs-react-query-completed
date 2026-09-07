'use client';

import { Suspense, useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getUserInfo } from '@/lib/api';
import { ProfilePhoto } from '@/components/ProfilePhoto';
import useClickOutside from '@/hooks/useClickOutside';
import { USERNAMES, USER_INFO_STALE_TIME_MS } from '@/lib/constants';
import { queryKeys } from '@/lib/queryKeys';
import { useLoginContext } from '@/contexts/LoginContext';
import * as styles from './UserMenu.css.js';

const anonymousUserIcon = '/assets/person.png';

// 1. UserMenuButtonContent 컴포넌트를 만들어 버튼 내용을 분리합니다.
function UserMenuButtonContent({ photo, name }) {
  return (
    <>
      <ProfilePhoto photo={photo} name={name} />
      <div className={styles.userName}>{name}</div>
    </>
  );
}

// 2. UserMenuLoggedIn 컴포넌트를 만들어 사용자 정보 조회와 Suspense를 연결합니다.
function UserMenuLoggedIn({ currentUsername }) {
  const { data: currentUserInfo } = useSuspenseQuery({
    queryKey: queryKeys.user.info(currentUsername),
    queryFn: () => getUserInfo(currentUsername),
    staleTime: USER_INFO_STALE_TIME_MS,
  });

  return (
    <UserMenuButtonContent
      photo={currentUserInfo.photo}
      name={currentUserInfo.name}
    />
  );
}

function UserMenu() {
  const router = useRouter();
  const { currentUsername, setCurrentUsername } = useLoginContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleCloseMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, [setIsMenuOpen]);

  // 메뉴가 열린 상태에서 바깥 클릭을 감지해 닫습니다.
  useClickOutside({
    isActive: isMenuOpen,
    onOutsideClick: handleCloseMenu,
  });

  const handleButtonClick = (e) => {
    e.stopPropagation();
    setIsMenuOpen((nextIsOpen) => !nextIsOpen);
  };

  const handleLoginClick = (username) => {
    setCurrentUsername(username);
    router.push('/');
  };

  const handleLogoutClick = () => {
    setCurrentUsername(undefined);
    router.push('/');
  };

  return (
    <div className={styles.userMenu}>
      <button className={styles.iconButton} onClick={handleButtonClick}>
        {/* 3. 로그인 여부에 따라 Suspense 분기 UI를 추가합니다. */}
        {currentUsername ? (
          <Suspense
            fallback={
              <UserMenuButtonContent photo={anonymousUserIcon} name="로딩 중" />
            }
          >
            <UserMenuLoggedIn currentUsername={currentUsername} />
          </Suspense>
        ) : (
          <UserMenuButtonContent photo={anonymousUserIcon} name="로그인" />
        )}
      </button>
      {isMenuOpen && (
        <ul className={styles.popup}>
          {currentUsername ? (
            <li
              className={styles.popupItem}
              onClick={() => {
                handleLogoutClick();
              }}
            >
              로그아웃
            </li>
          ) : (
            USERNAMES.map((username) => (
              <li
                key={username}
                className={styles.popupItem}
                onClick={() => {
                  handleLoginClick(username);
                }}
              >
                {username}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}

export default UserMenu;
