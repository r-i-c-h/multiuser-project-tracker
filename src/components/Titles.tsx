import Logo from '../assets/logo.svg';

import './Titles.scss';


const AppTitleH1 = () => {
  return (
    <h1 className='h1-main'>
      <span className='clr-prime'>Horizon Key</span>
      <img src={Logo} alt="logo" className='h1-main-logo' />
      <span className='clr-alt'>Project Tracker</span>
    </h1>
  )
}


export { AppTitleH1 };