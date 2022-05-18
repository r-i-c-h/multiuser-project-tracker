import { useEffect, useReducer, useState } from "react";
import { projectFirestore, timestamp } from "../firebase/config";
import { handleError } from "../ts/ErrorHandler";
import { IProject } from "../ts/interfaces-and-types";

type Action =
  | { type: 'IS_PENDING', payload: null }
  | { type: 'ADDED_DOCUMENT', payload: unknown } //! Maybe Pick<>? Will it always be project obj?
  | { type: 'UPDATED_DOCUMENT', payload: Partial<IProject> }
  | { type: 'DELETED_DOCUMENT', payload: null }
  | { type: 'ERROR', payload: string }

type State = {
  document: null | unknown;
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
    case 'UPDATED_DOCUMENT':
      return { ...state, document: action.payload, error: null, isPending: false, success: true }
    case 'DELETED_DOCUMENT':
      return { ...state, document: null, error: null, isPending: false, success: true }
    case 'ERROR':
      return { ...state, document: null, error: action.payload, isPending: false, success: false }
    default:
      return state
  }
}

export const useFirestore = (collectionName: string) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);

  // Fbase Collection:
  const ref = projectFirestore.collection(collectionName); // ref is a CollectionReference

  // Util to check component is still-mounted\hasn't left the DOM
  const dispatchIfNotCancelled = (action: Action) => {
    if (!isCancelled) {
      dispatch(action)
    }
  }

  const addDocument = async (doc: Partial<IProject>) => {
    await dispatch({ type: 'IS_PENDING', payload: null })

    try {
      const createdAt = timestamp.fromDate(new Date());
      const addedDocumentRef = await ref.add({ ...doc, createdAt }); // Uses .add() to generate a new docID (.set() requires an ID!)

      await dispatchIfNotCancelled({ type: 'ADDED_DOCUMENT', payload: addedDocumentRef })
    } catch (err) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: handleError(err) })
    }
  }

  const deleteDocument = async (id: string) => {
    await dispatch({ type: 'IS_PENDING', payload: null })
    try {
      const ___ = await ref.doc(id).delete();
      dispatchIfNotCancelled({ type: 'DELETED_DOCUMENT', payload: null })
    } catch (err) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: handleError(err) })
    }
  }

  const updateDocument = async (id: string, docUpdate: Partial<IProject>) => {
    await dispatch({ type: "IS_PENDING", payload: null });
    try {
      const ___ = await ref.doc(id).update(docUpdate)
      dispatchIfNotCancelled({ type: 'UPDATED_DOCUMENT', payload: docUpdate })
    } catch (err) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: handleError(err) })
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { addDocument, updateDocument, deleteDocument, response }
}