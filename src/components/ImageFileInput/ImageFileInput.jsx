import React, { useRef } from "react";
import styles from "components/ImageFileInput/imageFileInput.module.css";
import { toggleClassName } from "utils";

const ImageFileInput = ({ imageUploader, setNewUserObj, darkTheme }) => {
  const inputFileRef = useRef();

  const onFileChange = async (event) => {
    const {
      currentTarget: { files },
    } = event;

    const uploaded = await imageUploader.upload(files[0]);
    setNewUserObj((data) => ({ ...data, photoURL: uploaded.url }));
  };

  const onClick = (event) => {
    event.preventDefault();
    inputFileRef.current.click();
  };
  return (
    <div className={styles.imageFile}>
      <input
        className={styles.input}
        ref={inputFileRef}
        type="file"
        accept="image/*"
        onChange={onFileChange}
      />
      <button
        className={toggleClassName(darkTheme, styles, "button")}
        onClick={onClick}
      >
        Change Profile Photo
      </button>
    </div>
  );
};

export default ImageFileInput;
