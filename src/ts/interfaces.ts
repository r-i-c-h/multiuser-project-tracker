//! WARN ⚠️⚠️⚠️ NEED TO UPDATE RETURNED DATA INTERFACE(s) ⚠️⚠️⚠️!!!
//TODO: ⚠️⚠️⚠️ NEED TO UPDATE RETURNED DATA INTERFACE(s) ⚠️⚠️⚠️!!!
export interface INewItem {
  amount: string | number;
  createdAt?: Date;
  name: string;
  uid: string;
}

export interface IReturnedData extends INewItem {
  id: string;
}
