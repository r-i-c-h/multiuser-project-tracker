import { useState, useEffect } from "react";
import firebase from 'firebase/app'; // <~~ Need for proper typing
import { projectFirestore } from "../firebase/config";
import { handleError } from "../ts/ErrorHandler";
import { IUser } from "../ts/interfaces-and-types";


export const useUsersCollection = () => {
  //? Converter Function:  Tramsform obj{} of Type T into Firestore data
  // https://firebase.google.com/docs/reference/js/v8/firebase.firestore.FirestoreDataConverter
  // https://stackoverflow.com/questions/60065396/add-typings-to-firebase-collection-query
  // await db.collection('foos').get() as firebase.firestore.QuerySnapshot<Foo>;
  // await db.collection('foos').doc('12345').get() as firebase.firestore.DocumentSnapshot<Foo>;

  const userConverter = {
    toFirestore(user: IUser): firebase.firestore.DocumentData {
      return { uid: user.uid, displayName: user.displayName, online: user.online, photoURL: user.photoURL };
    },
    fromFirestore(
      snapshot: firebase.firestore.QueryDocumentSnapshot,
      options: firebase.firestore.SnapshotOptions
    ): IUser {
      const data = snapshot.data(options);
      return {
        uid: data.uid,
        displayName: data.displayName,
        online: data.online,
        photoURL: data.photoURL
      };
    }
  };

  const [users, setUsers] = useState<null | IUser[]>(null);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => { // useEffect will fire as soon as this mounts to the DOM
    const unsubscribe = projectFirestore.collection('users').withConverter(userConverter).onSnapshot((snapshot) => {

      let results: IUser[] = [];

      snapshot.docs.forEach(doc => {
        if (doc.exists) {
          let docData = doc.data() as IUser
          docData.uid = doc.id
          results.push(docData)
        }
      })


      // ...Update State:
      setUsers(results)
      setError(null);
    }, (err) => {
      setError(handleError(err));
      console.error(err.message);
    })

    //  Unsub on unmount
    return () => unsubscribe()
  }, [])

  return { users, error }
}