import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { toastOptions } from "../../components/constants";
import { uploadFile, getFileUrl } from "../../firebase/fileUtils";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import scanFile from "../../ocr/scanFile";
import styles from "../../styles/Home.module.css";
import app from "../../firebase/clientApp";

const storage = getStorage(app);

const imageMaxSize = 10000000; // 10MB
const acceptedFileTypesArray = [
  "image/x-png",
  "image/png",
  "image/jpg",
  "image/jpeg",
  "image/gif",
  "application/pdf",
];

//Validating file type and size
const verifyFile = (files) => {
  if (files && files.length > 0) {
    const currentFile = files[0];
    const currentFileType = currentFile.type;
    const currentFileSize = currentFile.size;
    if (currentFileSize > imageMaxSize) {
      alert(
        "This file is not allowed. " + currentFileSize + " bytes is too large"
      );
      return false;
    }
    if (!acceptedFileTypesArray.includes(currentFileType)) {
      alert("This file is not allowed. Only images are allowed.");
      return false;
    }
    return true;
  }
};

export default function Home() {
  const [text, setText] = useState(null);
  function handleFileChange(e) {
    const files = e.target.files;
    if (files && files.length > 0) {
      const isVerified = verifyFile(files);
      if (!isVerified) {
        toast.error(
          "Invalid file. Please upload pdf, jpg or png",
          toastOptions
        );
      }
    }
  }
  async function handleSubmit(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target).entries());
    console.log(data.rawFile);
    const fileExtension = data.rawFile.name.split(".").reverse()[0];
    uploadFile(data.rawFile, "tests", data.rawFile.name)
      .then(() => {
        toast.success("File uploaded successfully!", toastOptions);
        getDownloadURL(ref(storage, `tests/${data.rawFile.name}`)).then(
          async (fileURL) => {
            console.log("fileurl = ", fileURL);
            const text = await scanFile(fileURL, fileExtension);
            setText(text);
          }
        );

        console.log("text", text);
        // uploadText(text, data.rawFile.name);
        console.log(data);
      })
      .catch((err) => {
        toast.error(err, toastOptions);
      });
  }
  return (
    <div className={styles.container}>
      <h1>Create Exam</h1>
      <form action="" method="POST" onSubmit={handleSubmit}>
        <div className={styles.fileInputContainer}>
          <input
            type="file"
            name="rawFile"
            id="rawFile"
            onChange={handleFileChange}
          />
          <input type="submit" value="Submit" />
        </div>
      </form>
      {text && (
        <div className={styles.output}>
          <p>{text}</p>
        </div>
      )}
    </div>
  );
}
