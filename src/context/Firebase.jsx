import { initializeApp } from "firebase/app";
import { createContext, useContext, useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const FirebaseContext = createContext(null);

export const useFirebase = () => useContext(FirebaseContext);

const firebaseConfig = {};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

const googleAuth = new GoogleAuthProvider();

/////////////////////////////////////////////////////////
export const FirebaseProvider = (props) => {
  const [user, setUser] = useState(null);
  const isLoggedIn = user ? true : false;

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });
  }, []);

  const signupUserWithEmailAndPassword = (email, password) => {
    return createUserWithEmailAndPassword(firebaseAuth, email, password);
  };

  const signinUserWithEmailAndPassword = (email, password) => {
    return signInWithEmailAndPassword(firebaseAuth, email, password);
  };

  const signinWithGoogle = () => {
    return signInWithPopup(firebaseAuth, googleAuth);
  };

  const handleCreateNewListing = async (name, isbnNumber, price, coverPic) => {
    const imageRef = ref(
      storage,
      `uploads/images/${Date.now()}-${coverPic.name}`
    );
    const uploadResult = await uploadBytes(imageRef, coverPic);
    return await addDoc(collection(firestore, "books"), {
      name,
      isbnNumber,
      price,
      imageURL: uploadResult.ref.fullPath,
      userId: user.uid,
      userEmail: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    });
    console.log(uploadResult);
  };

  const listAllBooks = () => {
    return getDocs(collection(firestore, "books"));
  };

  const getImageURL = (path) => {
    return getDownloadURL(ref(storage, path));
  };

  const getBookById = async (id) => {
    const docRef = doc(firestore, "books", id);
    const result = await getDoc(docRef);
    return result;
  };

  const placeOrder = async (booksId, qt) => {
    const collectionRef = collection(firestore, "books", booksId, "orders");
    const res = await addDoc(collectionRef, {
      userID: user.uid,
      userEmail: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      qt: Number(qt),
    });
    return res;
  };

  const fetchMyBooks = async () => {
    const collectionRef = collection(firestore, "books");
    const q = query(collectionRef, where("userId", "==", user.uid));
    const res = await getDocs(q);
    console.log(res);
    return res;
  };

  const fetchOrders = async (bookId) => {
    const collectionRef = collection(firestore, "books", bookId, "orders");
    const res = await getDocs(collectionRef);
    console.log(res);
    return res;
  }

  return (
    <FirebaseContext.Provider
      value={{
        signupUserWithEmailAndPassword,
        signinUserWithEmailAndPassword,
        signinWithGoogle,
        isLoggedIn,
        handleCreateNewListing,
        listAllBooks,
        getImageURL,
        getBookById,
        placeOrder,
        fetchMyBooks,
        fetchOrders
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
