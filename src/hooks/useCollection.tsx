import { useState, useEffect, useRef } from "react";
import { projectFirestore } from "../firebase/config";
import { handleError } from "../ts/ErrorHandler";
//! WARN ⚠️⚠️⚠️ NEED TO UPDATE RETURNED DATA INTERFACE(s) ⚠️⚠️⚠️!!!
import { IReturnedData } from "../ts/interfaces"; //TODO: ⚠️⚠️⚠️ NEED TO UPDATE RETURNED DATA INTERFACE(s) ⚠️⚠️⚠️!!!

import firebase from 'firebase/app'; // <~~ Need this for the proper typing ¯\_(ツ)_/¯

type FieldPath = firebase.firestore.FieldPath;
type TQueryOptions = [string | FieldPath, firebase.firestore.WhereFilterOp, string]
type TSortingOptions = [string | FieldPath, "asc" | "desc"]
type TFlexibleRef = firebase.firestore.CollectionReference | firebase.firestore.Query; //if 🎣 call *does* have options, it changes the typing...

export const useCollection = (collection: string, options?: TQueryOptions, order?: TSortingOptions) => {
  const [documents, setDocuments] = useState<null | IReturnedData[]>(null);
  const [error, setError] = useState<null | string>(null);

  // useRef Stops infinite update 🔄 when setting options/order as a useEffect() dependency
  const queryOptions = options ? useRef(options).current : null;
  const sortingOptions = order ? useRef(order).current : null;

  useEffect(() => { // useEffect will fire as soon as this mounts to the DOM
    let ref: TFlexibleRef = projectFirestore.collection(collection);

    if (queryOptions) {
      const [fieldPath, opStr, value] = [...queryOptions]
      ref = ref.where(fieldPath, opStr, value);
    }
    if (sortingOptions) {
      ref = ref.orderBy(...sortingOptions);
    }
    const unsubscribe = ref.onSnapshot((snapshot) => {
      let results: IReturnedData[] = [];

      snapshot.docs.forEach(doc => {
        const docData = { ...doc.data(), id: doc.id } as IReturnedData
        results.push(docData)
      })

      // ...Update State:
      setDocuments(results)
      setError(null);
    }, (err) => {
      setError(handleError(err));
      console.error(err.message);
    })

    //  Unsub on unmount
    return () => unsubscribe()
  }, [collection, queryOptions, sortingOptions])

  return { documents, error }
}