import { ChangeEvent, FormEvent, useState } from 'react';
import { AppTitleH1 } from '../../components/Titles';
import { useSignup } from '../../hooks/useSignup'
import { handleError } from '../../ts/ErrorHandler'

import './Signup.scss'
import PasswordToggleButton from '../../components/PasswordToggleButton';

export default function Signup() {
  const { signup, isPending, error } = useSignup()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [thumbnailImg, setThumbnailImg] = useState<File | null>(null);
  const [thumbnailError, setThumbnailError] = useState<string | null>(null);

  const [isPasswordInputVisible, setIsPasswordInputVisible] = useState<boolean>(false);
  const togglePasswordInputVisibility = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsPasswordInputVisible(!isPasswordInputVisible);
  }
  const handleImageFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    setThumbnailImg(null) //reset
    const selectedFile = e.target.files![0];
    if (!selectedFile) {
      setThumbnailError(`Please select a file to use for your profile image`);
      return;
    }
    if (!selectedFile.type.includes('image')) {
      setThumbnailError(`Selected file must be an image, not ${selectedFile.type}`)
      return;
    }
    if (selectedFile.size > 100000) {
      setThumbnailError(`Sorry, the image file-size must be less than 100KB`)
      return;
    }

    setThumbnailError(null)
    setThumbnailImg(selectedFile);
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (thumbnailImg) {
      signup(email, password, displayName, thumbnailImg)
    }
  }

  return (
    <>
      <AppTitleH1 />
      <form onSubmit={handleSubmit} className="entry-panel">
        <h2>Sign Up</h2>
        <label>{/* Display name*/}
          <span>Display Name:</span>
          <input
            required
            type="text"
            onChange={(e) => setDisplayName(e.target.value)}
            value={displayName}
            placeholder="Desired Display Name"
          />
        </label>
        <label> {/* Email */}
          <span>Email:</span>
          <input
            required
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Your Email Address"
          />
        </label>
        <label> {/* Pwd */}
          <span>Password:
            <PasswordToggleButton isPasswordVisible={isPasswordInputVisible} onClick={togglePasswordInputVisibility} /></span>
          <input
            required
            type={isPasswordInputVisible ? "text" : "password"}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Enter A Password"
          />
        </label>
        <label> {/* thumbnailImage */}
          <span>Profile Image:</span>
          <input
            required
            type="file"
            onChange={handleImageFileInput}
          />
          {thumbnailError && <div className="error">{thumbnailError}</div>}
        </label>
        {!isPending && <button className="btn">Sign Up</button>}
        {isPending && <button className="btn" disabled>Loading</button>}
        {error && <div className="error">{handleError(error)}</div>}
      </form>
    </>
  )
}
