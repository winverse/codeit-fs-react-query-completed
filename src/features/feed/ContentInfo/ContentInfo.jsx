import { UserInfo } from "@/features/feed/UserInfo";
import * as styles from "./ContentInfo.css.js";

function formatDate(timestamp) {
  const fullDate = new Date(timestamp);
  const date = fullDate.getDate();
  const month = fullDate.getMonth() + 1;
  const year = fullDate.getFullYear();
  let hours = fullDate.getHours();
  let minutes = fullDate.getMinutes();
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;

  return `${year}-${month}-${date} ${hours}:${minutes}`;
}

function ContentInfo({ user, updatedTime }) {
  return (
    <div className={styles.info}>
      <UserInfo name={user.name} photo={user.photo} />
      <div className={styles.date}>{formatDate(updatedTime)}</div>
    </div>
  );
}

export default ContentInfo;
