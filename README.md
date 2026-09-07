# codeit-fs-react-query-completed

28번 토픽 `React-query`의 완성본입니다. `codeit-fs-react-query-starter`에서 시작해 강의자료의 코드 단계를 순서대로 모두 적용한 최종 상태를 담고 있습니다.

## 실행

```bash
pnpm install
pnpm dev
```

브라우저에서 `http://localhost:3000`을 엽니다.

## 구성

공부 기록을 공유하는 SNS입니다. 포스트 목록 무한 조회, 사용자별 피드, 댓글 페이지네이션과 미리 가져오기, 좋아요의 낙관적 업데이트와 실패 복구를 TanStack Query로 구현했습니다.

| 영역                   | 위치                                             |
| ---------------------- | ------------------------------------------------ |
| 쿼리 키 팩토리         | `src/lib/queryKeys.js`                           |
| API 함수               | `src/lib/api.js`                                 |
| Provider와 캐시 기본값 | `src/providers/AppProviders.jsx`                 |
| 목록 무한 조회         | `src/domains/feed/hooks/usePostListQuery.js`     |
| 조회 경계              | `src/components/QueryBoundary/QueryBoundary.jsx` |
| 댓글 페이지네이션      | `src/domains/feed/CommentList/CommentList.jsx`   |
| 좋아요 낙관적 업데이트 | `src/domains/feed/hooks/useLikeMutation.js`      |

## 참고

이 저장소는 완성 상태를 확인하는 용도입니다. 학습은 `codeit-fs-react-query-starter`에서 강의자료를 따라 직접 코드를 작성하며 진행합니다.

요구 환경은 Node.js 24 이상과 `pnpm`입니다.
