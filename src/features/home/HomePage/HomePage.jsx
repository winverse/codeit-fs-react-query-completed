import { Container } from "@/components/Container";
import { QueryBoundary } from "@/components/QueryBoundary";
import { PostList } from "@/features/feed/PostList";
import { FEED_VARIANT } from "@/constants/feed";
import * as styles from "./HomePage.css.js";

function HomePage() {
  return (
    <Container className={styles.container}>
      <QueryBoundary>
        <PostList variant={FEED_VARIANT.HOME_FEED} />
      </QueryBoundary>
    </Container>
  );
}

export default HomePage;
