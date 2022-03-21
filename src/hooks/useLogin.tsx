import { useEffect, useState } from 'react'
import { projectAuth } from '../firebase/config'
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

      if (!res) { throw new Error('Could not Login') }

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