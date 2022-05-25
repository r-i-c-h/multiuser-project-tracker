import firebase from 'firebase/app'; // <~~ Need for proper typing

/*** Types: ***/
export type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> & U[keyof U]; // force pick a prop from out of another type\interface

type TFieldPath = firebase.firestore.FieldPath;
export type TQueryOptions = [string | TFieldPath, firebase.firestore.WhereFilterOp, string];
export type TSortingOptions = [string | TFieldPath, 'asc' | 'desc'];
export type TFlexibleRef = firebase.firestore.CollectionReference | firebase.firestore.Query; //if 🎣 call *does* have options, it changes to a Query...
/* export type TReturnedData =
  | firebase.firestore.QueryDocumentSnapshot // for query *with* Options\Filter\Sorting
  | firebase.firestore.DocumentSnapshot; // for get()-er without Options or Filters
  // ⚠️ Double check for .exists before calling .data()!
*/

/*** Interfaces: ***/
export interface IUser {
  uid: string;
  displayName: string | null;
  online: boolean;
  photoURL: string | null;
}

export interface IProjectComment {
  authorName: string | null;
  authorPhotoURL: string | null;
  content: string;
  createdAt: firebase.firestore.Timestamp;
  commentID: string; //crypto.randomUUID() ?? Math.random()
}

export interface IProject {
  id?: string; // issued when stored \ retrieved from Firebase - immutable
  createdBy: Omit<IUser, 'online'>; // - immutable
  createdAt?: firebase.firestore.Timestamp; // added in Firebase.set() in useFirestore - immutable
  endDate: firebase.firestore.Timestamp;
  projectName: string;
  details: string;
  category: string | undefined;
  comments: IProjectComment[];
  assignedUsers: Omit<IUser, 'online'>[];
}

export interface IProjectDetailsWrapper {
  project: IProject;
}
