import { useEffect, useState } from 'react'
import { projectAuth } from '../firebase/config'
import { useAuthContext } from './useAuthContext';

export const useLogout = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState<unknown>(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuthContext();

  const logout = async () => {
    setIsPending(true)
    setError(null)

    try {
      await projectAuth.signOut();

      dispatch!({ type: 'LOGOUT' })

      if (!isCancelled) {
        setIsPending(false)
        setError(null)
      }

    } catch (err) {
      if (!isCancelled) {
        setIsPending(false)
        setError(err)
      }
    }

  }

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { error, isPending, logout }
}