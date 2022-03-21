import { useEffect, useReducer, useState } from "react";
import { projectFirestore, timestamp } from "../firebase/config";
import { handleError } from "../ts/ErrorHandler";
import { INewItem } from "../ts/interfaces";

type Action =
  | { type: 'IS_PENDING', payload: null }
  | { type: 'ADDED_DOCUMENT', payload: INewItem }
  | { type: 'DELETED_DOCUMENT', payload: null }
  | { type: 'ERROR', payload: string }

type State = {
  document: null | INewItem
  error: null | string; //** Skipping unknown because `handleError()` will return a string */
  isPending: boolean;
  success: null | boolean;
}

let initialState: State = {
  document: null,
  error: null,
  isPending: false,
  success: null,
}

const firestoreReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'IS_PENDING':
      return { ...state, document: null, error: null, isPending: true, success: false }
    case 'ADDED_DOCUMENT':
      return { ...state, document: action.payload, error: null, isPending: false, success: true }
    case 'DELETED_DOCUMENT':
      return { ...state, document: null, error: null, isPending: false, success: true }
    case 'ERROR':
      return { ...state, document: null, error: action.payload, isPending: false, success: false }
    default:
      return state
  }
}

export const useFirestore = (collection: string) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);

  // Fbase Collection:
  const ref = projectFirestore.collection(collection);

  // Util checks that component is still mounted and hasn't left the DOM
  const dispatchIfNotCancelled = (action: Action) => {
    if (!isCancelled) {
      dispatch(action)
    }
  }

  const addDocument = async (doc: INewItem) => {
    await dispatch({ type: 'IS_PENDING', payload: null })

    try {
      const createdAt = timestamp.fromDate(new Date());
      const addedDocumentRef: unknown = await ref.add({ ...doc, createdAt });
      const newDoc = addedDocumentRef as INewItem // <~~ Makes TS Happy ＜(。_。)＞

      await dispatchIfNotCancelled({ type: 'ADDED_DOCUMENT', payload: newDoc })
    } catch (err) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: handleError(err) })
    }
  }

  const deleteDocument = async (id: string) => {
    await dispatch({ type: 'IS_PENDING', payload: null })
    try {
      const deletedDocument = await ref.doc(id).delete();
      dispatchIfNotCancelled({ type: 'DELETED_DOCUMENT', payload: null })
    } catch (err) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: handleError(err) })
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { addDocument, deleteDocument, response }
}