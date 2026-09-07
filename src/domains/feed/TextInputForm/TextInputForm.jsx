'use client';

import { useState } from 'react';
import { ProfilePhoto } from '@/components/ProfilePhoto';
import { Button } from '@/components/Button';
import * as styles from './TextInputForm.css.js';

function TextInputForm({
  onSubmit,
  currentUserInfo,
  placeholder,
  buttonText,
  buttonDisabled,
}) {
  const [content, setContent] = useState('');

  const handleInputChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentUserInfo) return;
    onSubmit(content);
    setContent('');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.avatar}>
        <ProfilePhoto
          photo={currentUserInfo?.photo}
          name={currentUserInfo?.name}
        />
      </div>
      <textarea
        className={styles.textarea}
        name="content"
        placeholder={placeholder}
        value={content}
        onChange={handleInputChange}
      />
      <Button
        disabled={buttonDisabled || !content || !currentUserInfo}
        type="submit"
      >
        {buttonText}
      </Button>
    </form>
  );
}

export default TextInputForm;
