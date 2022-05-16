
import firebase from 'firebase/app'; //! <~~ Need for proper typing
import { useState, useEffect } from "react";
import { projectFirestore } from "../firebase/config";
import { handleError } from "../ts/ErrorHandler";
import { IProject } from "../ts/interfaces-and-types";


export const useDocument = (collection: string, docID: string) => {
  const [document, setDocument] = useState<IProject | null>(null);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => { // useEffect will fire as soon as this mounts to the DOM
    const docRef = projectFirestore.collection(collection).doc(docID);

    const unsubscribe = docRef.onSnapshot((snapshot: firebase.firestore.DocumentSnapshot) => {
      const data = snapshot.data() as IProject;
      if (data) {
        setDocument({ ...data, id: snapshot.id })
        setError(null);
      } else {
        setError(`Document ID ${docID} has no data to display`)
      }
    },
      (err) => {
        setError(handleError(err));
        console.error(err.message);
      }
    )

    //  Unsub on unmount
    return () => unsubscribe()
  }, [collection, docID])

  return { document, error }
}