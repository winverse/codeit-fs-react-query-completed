import Image from "next/image";
import * as styles from "./ProfilePhoto.css.js";

const FALLBACK_PHOTO = "/assets/person.png";

function ProfilePhoto({ photo, name }) {
  const src = photo || FALLBACK_PHOTO;
  const alt = name || "프로필";

  return (
    <Image
      className={styles.profilePhoto}
      src={src}
      alt={alt}
      width={30}
      height={30}
    />
  );
}

export default ProfilePhoto;
