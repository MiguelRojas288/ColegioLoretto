import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBSlreA2Yru9fX9aZ04txi7Pln5STRboJw",
  authDomain: "italo-boliviano.firebaseapp.com",
  projectId: "italo-boliviano",
  storageBucket: "italo-boliviano.appspot.com",
  messagingSenderId: "877526974412",
  appId: "1:877526974412:web:fad04fcb617d29d1c66769"
  // measurementId: "G-C0XX5L65Q2"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)

export async function uploadFile(file, name) {
  const storageRef = ref(storage, name)
  await uploadBytes(storageRef, file)
  const url = await getDownloadURL(storageRef)
  return url
}