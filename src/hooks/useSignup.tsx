import { useEffect, useState } from 'react'
import { projectAuth, projectFirestore, projectStorage } from '../firebase/config'
import { useAuthContext } from './useAuthContext';
import { handleError } from '../ts/ErrorHandler';



export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState<unknown>(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuthContext();

  const signup = async (email: string, password: string, displayName: string, thumbnail: File) => {
    setIsPending(true)
    setError(null)

    try {
      const res = await projectAuth.createUserWithEmailAndPassword(email, password)
      if (!res) { throw new Error('Could not complete signup') }
      if (!res.user) { throw new Error('Could not complete signup - user-creation Error') }
      const newUserID = res.user.uid;

      // 1. Put Profile Image in Firestore
      const imgUploadPath = `thumbnails/${newUserID}/${thumbnail.name}`
      const img = await projectStorage.ref(imgUploadPath).put(thumbnail);
      const imgURL = await img.ref.getDownloadURL();

      // 2. Set DisplayName & the Photo's URL to be the user's 'official' profile image
      await res.user.updateProfile({ displayName, photoURL: imgURL })

      // 3. Create a 'User Document' in the 'users' collection
      await projectFirestore.collection('users').doc(newUserID).set({
        online: true,
        displayName: displayName,
        photoURL: imgURL
      })

      dispatch!({ type: 'LOGIN', payload: res.user })

      if (!isCancelled) {
        setIsPending(false)
        setError(null)
      }
    } catch (err) {
      if (!isCancelled) {
        setIsPending(false)
        setError(handleError(err))
      }
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { error, isPending, signup }
}