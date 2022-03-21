import { useEffect, useState } from 'react'
import { projectAuth } from '../firebase/config'
import { useAuthContext } from './useAuthContext';
import { handleError } from '../ts/ErrorHandler';



export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState<unknown>(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuthContext();

  const signup = async (email: string, password: string, displayName: string) => {
    setIsPending(true)
    setError(null)

    try {
      const res = await projectAuth.createUserWithEmailAndPassword(email, password)

      if (!res) { throw new Error('Could not complete signup') }

      await res.user?.updateProfile({ displayName })// add display name to user

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