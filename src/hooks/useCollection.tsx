import firebase from 'firebase/app'; //! <~~ Need for proper typing
import { useState, useEffect, useRef } from "react";
import { projectFirestore } from "../firebase/config";
import { handleError } from "../ts/ErrorHandler";
import { TQueryOptions, TSortingOptions, TFlexibleRef } from "../ts/interfaces-and-types";

interface IFbaseResponse<T> {
  documents: T[];
  error: string | null;
}

export function useCollection<T>(collection: string, options?: TQueryOptions, order?: TSortingOptions): IFbaseResponse<T> {
  const [documents, setDocuments] = useState<T[]>([]);
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
      let results: T[] = [];

      snapshot.docs.forEach(doc => {
        if (doc.exists) {
          let data = doc.data() as T
          const docData = { ...data, id: doc.id }
          results.push(docData)
        }
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