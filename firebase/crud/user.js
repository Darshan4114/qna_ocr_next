import { getFirestore, doc, setDoc } from "firebase/firestore";
import app from "../../firebase/clientApp";

const db = getFirestore(app);

export async function addUser(userId, userData) {
  return await setDoc(doc(db, "users", userId), userData);
}
