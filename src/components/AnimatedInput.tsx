import { FormEvent, useState } from 'react';

import { IAnimatedInput } from '../ts/interfaces-and-types';
import './AnimatedInput.scss';

export default function AnimatedInput({ id, injectedValue, labelText, type, placeholder, onChange }: IAnimatedInput) {
  const placeholderText = placeholder;
  return (
    <div className='animated-input'>
      <input
        required
        type={type}
        id={id}
        className="form-input"
        // placeholder={placeholderText}
        onChange={onChange}
        value={injectedValue}/>
      <label htmlFor={id}>{labelText}</label>
    </div>
  )
};