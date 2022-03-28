import { FormEvent, useState } from 'react';
import { AppTitleH1 } from '../../components/Titles';
import { useLogin } from '../../hooks/useLogin';
import { handleError } from '../../ts/ErrorHandler'

import './Login.scss'

export default function Login() {
  const { error, isPending, login } = useLogin();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    login(email, password)
  }

  return (<>
    <AppTitleH1 />
    <form onSubmit={handleSubmit} className="login-form">
      <h2>Account Login</h2>
      <label> {/* Email */}
        <span>Email:</span>
        <input
          required
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>
      <label> {/* Pwd */}
        <span>Password:</span>
        <input
          required
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>
      {!isPending && <button className="btn">Login</button>}
      {isPending && <button className="btn" disabled>Loading</button>}
      {error && <div className="error">{handleError(error)}</div>}
    </form>
  </>)
}
