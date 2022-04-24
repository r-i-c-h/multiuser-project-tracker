import firebase from 'firebase/app'; // <~~ Need for proper typing

/*** Types: ***/
type TFieldPath = firebase.firestore.FieldPath;
export type TQueryOptions = [string | TFieldPath, firebase.firestore.WhereFilterOp, string];
export type TSortingOptions = [string | TFieldPath, 'asc' | 'desc'];
export type TFlexibleRef = firebase.firestore.CollectionReference | firebase.firestore.Query; //if 🎣 call *does* have options, it changes to a Query...
/* export type TReturnedData =
   | firebase.firestore.QueryDocumentSnapshot // for query *with* Options\Filter\Sorting
   | firebase.firestore.DocumentSnapshot; // for get()-er without Options or Filters
  // ! Double check for .exists before calling .data()! */

/*** Interfaces: ***/
export interface IUser {
  uid: string;
  displayName: string | null;
  online: boolean;
  photoURL: string | null;
}

export interface IProject {
  id?: string; // issued when stored \ retrieved from Firebase
  projectName: string;
  endDate: firebase.firestore.Timestamp;
  createdAt?: firebase.firestore.Timestamp; // added in Firebase.set() in useFirestore
  createdBy: Omit<IUser, 'online'>;
  details: string;
  category: string | undefined;
  comments: string[];
  assignedUsers: Omit<IUser, 'online'>[];
}
