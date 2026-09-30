"use client";

import { Suspense, useState } from "react";
import { useRouter } from "next/navigation";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getUserInfo } from "@/lib/api";
import { ProfilePhoto } from "@/components/ProfilePhoto";
import useClickOutside from "@/hooks/useClickOutside";
import { USER_INFO_STALE_TIME_MS } from "@/constants/time";
import { USERNAMES } from "@/constants/user";
import { queryKeys } from "@/lib/queryKeys";
import { useLoginContext } from "@/contexts/LoginContext";
import * as styles from "./UserMenu.css.js";

const ANONYMOUS_USER_ICON = "/assets/person.png";

// 버튼 안에 프로필 사진과 이름을 표시합니다.
function UserMenuButtonContent({ photo = ANONYMOUS_USER_ICON, name }) {
  return (
    <>
      <ProfilePhoto photo={photo} name={name} />
      <div className={styles.userName}>{name}</div>
    </>
  );
}

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

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  // 메뉴가 열린 상태에서 바깥 클릭을 감지해 닫습니다.
  useClickOutside({
    isActive: isMenuOpen,
    onOutsideClick: handleCloseMenu,
  });

  const handleButtonClick = (e) => {
    e.stopPropagation();
    setIsMenuOpen((isOpen) => !isOpen);
  };

  const handleLoginClick = (username) => {
    setCurrentUsername(username);
    router.push("/");
  };

  const handleLogoutClick = () => {
    setCurrentUsername(undefined);
    router.push("/");
  };

  return (
    <div className={styles.userMenu}>
      <button className={styles.iconButton} onClick={handleButtonClick}>
        {currentUsername ? (
          <Suspense fallback={<UserMenuButtonContent name="로딩 중" />}>
            <UserMenuLoggedIn currentUsername={currentUsername} />
          </Suspense>
        ) : (
          <UserMenuButtonContent name="로그인" />
        )}
      </button>
      {isMenuOpen && (
        <ul className={styles.popup}>
          {currentUsername ? (
            <li className={styles.popupItem} onClick={handleLogoutClick}>
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
