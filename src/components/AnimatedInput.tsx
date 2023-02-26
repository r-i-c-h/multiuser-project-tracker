import { FormEvent, useState } from 'react';

import { IAnimatedInput } from '../ts/interfaces-and-types';
import './AnimatedInput.scss';

export default function AnimatedInput({ id, injectedValue, labelText, type, placeholder, onChange }: IAnimatedInput) {
  return (
    <div className="animated-input">
      <input
        required
        type={type}
        id={id}
        placeholder={placeholder}
        onChange={onChange}
        value={injectedValue}
      />
      <label htmlFor={id}>{labelText}</label>
    </div>
  )
};