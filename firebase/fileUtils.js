import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { toast } from "react-toastify";
import { toastOptions } from "../components/constants";

import app from "./clientApp";

export async function uploadFile(file, folder, filename) {
  return new Promise((resolve) => {
    const storage = getStorage(app);
    console.log("setting ref = ", `${folder}/${filename}`);
    const storageRef = ref(storage, `${folder}/${filename}`);
    console.log("upload params", storageRef, file, filename);

    uploadBytes(storageRef, file)
      .then((snapshot) => {
        resolve(snapshot);
        console.log("Uploaded a blob or file!", snapshot);
      })
      .catch((err) => {
        console.log("file upload err", err);
      });
  });
}
