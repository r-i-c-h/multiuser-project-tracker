import firebase from 'firebase/app'; // <~~ Need for proper typing

/*** Types: ***/
type TFieldPath = firebase.firestore.FieldPath;
export type TQueryOptions = [string | TFieldPath, firebase.firestore.WhereFilterOp, string];
export type TSortingOptions = [string | TFieldPath, 'asc' | 'desc'];
export type TFlexibleRef = firebase.firestore.CollectionReference | firebase.firestore.Query; //if 🎣 call *does* have options, it changes to a Query...

export type TReturnedData =
  | firebase.firestore.QueryDocumentSnapshot // for query *with* Options\Filter\Sorting
  | firebase.firestore.DocumentSnapshot; // for get()-er without Options or Filters
//! Double check for .exists before calling .data()!

/*** Interfaces: ***/
export interface IUser {
  // id: string;
  uid: string;
  displayName: string;
  online: boolean;
  photoURL: string;
}

export interface IProject {
  projectName: string;
  endDate: Date | string;
  createdBy?: string;
  createdAt: Date | string;
  details: string;
  category: string;
  assignedUsers: IUser | IUser[] | IUser[][];
}

//! WARN ⚠️⚠️⚠️ NEED TO UPDATE RETURNED DATA INTERFACE(s) in useFirestore() 🎣 ⚠️⚠️⚠️!!!
//TODO: ⚠️⚠️⚠️ NEED TO UPDATE RETURNED DATA INTERFACE(s) ⚠️⚠️⚠️!!!
export interface INewItem {
  createdAt?: Date;
  name: string;
  uid: string;
}
