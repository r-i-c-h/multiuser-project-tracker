import IconEyeOpen from '../assets/icon_eye-open-min.svg';
import IconEyeSlash from '../assets/icon_eye-slash-min.svg';

import './PasswordToggleButton.scss';

interface IPasswordToggleButton {
  isPasswordVisible: boolean;
  onClick: React.MouseEventHandler
}

export default function PasswordToggleButton({ isPasswordVisible, onClick }: IPasswordToggleButton){
    return (<><button onClick={onClick} className="password-toggle-btn">
      {
        isPasswordVisible ?
          <img src={IconEyeSlash} alt="hide password input" />
        : <img src={IconEyeOpen} alt="show password input" />
      }
    </button></>)
}


/*
  const [isPasswordInputVisible, setIsPasswordInputVisible] = useState<boolean>(false);

  const togglePasswordInputVisibility = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsPasswordInputVisible(!isPasswordInputVisible);
  }
*/