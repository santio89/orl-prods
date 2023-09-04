import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyAxX90YjLXNMGxfG1muK-RcHFsTtx-3-GM",
    authDomain: "orlosh-tableform.firebaseapp.com",
    databaseURL: "https://orlosh-tableform-default-rtdb.firebaseio.com/",
    projectId: "orlosh-tableform",
    storageBucket: "orlosh-tableform.appspot.com",
    messagingSenderId: "727052177343",
    appId: "1:727052177343:web:1e012e014b06a0c5d7db0a"
};


export const firebaseApp = initializeApp(firebaseConfig);

export const firebaseStorage = getStorage(firebaseApp)
export const firebaseDb = getDatabase(firebaseApp)
