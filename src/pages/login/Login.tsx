import { FormEvent, useState } from 'react';
import { AppTitleH1 } from '../../components/Titles';
import { useLogin } from '../../hooks/useLogin';
import { handleError } from '../../ts/ErrorHandler'

import DemoAccounts from './DemoAccounts';
import AnimatedInput from '../../components/AnimatedInput';
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
    <form onSubmit={handleSubmit} className="entry-panel">
      <h2>Account Login</h2>
      <DemoAccounts />
      <AnimatedInput
        id="login-email"
        type="email"
        injectedValue={email}
        labelText="Email Address"
        placeholder="Please Enter Email Address"
        onChange={(e) => setEmail(e.target.value)}
      />
      <AnimatedInput
        id="login-pass"
        type="password"
        injectedValue={password}
        labelText="Password"
        placeholder="Please Enter Your Password"
          onChange={(e) => setPassword(e.target.value)}
      />
      {!isPending && <button className="btn">Login</button>}
      {isPending && <button className="btn" disabled>Loading</button>}
      {error && <div className="error">{handleError(error)}</div>}
    </form>
  </>)
}
