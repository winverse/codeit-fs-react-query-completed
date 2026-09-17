import { ContentInfo } from "@/features/feed/ContentInfo";
import * as styles from "./Comment.css.js";

function Comment({ comment }) {
  return (
    <div className={styles.comment}>
      <ContentInfo user={comment.user} updatedTime={comment.updatedAt} />
      <p className={styles.description}>{comment.content}</p>
    </div>
  );
}

export default Comment;
