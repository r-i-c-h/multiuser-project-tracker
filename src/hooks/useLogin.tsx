import { useEffect, useState } from 'react'
import { projectAuth, projectFirestore } from '../firebase/config'
import { useAuthContext } from './useAuthContext';
import { handleError } from '../ts/ErrorHandler';

export const useLogin = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState<unknown>(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuthContext();

  const login = async (email: string, password: string) => {
    setIsPending(true)
    setError(null)

    try {
      const res = await projectAuth.signInWithEmailAndPassword(email, password);

      if (!res || !res.user) { throw new Error('Could not Login') }

      await projectFirestore.collection('users').doc(res.user.uid).update({ online: true })

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

  return { error, isPending, login }
}