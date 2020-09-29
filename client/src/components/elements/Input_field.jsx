import React from 'react';

// reusable input field
const InputField = (props) => {
  return (
    <div className="input-field">
      <input
        className={props.className}
        type={props.type}
        name={props.name}
        autoComplete={props.name}
        placeholder={props.placeholder}
        value={props.value}
        onKeyDown={props.onKeyDown}
        onChange={props.handleChange}
        required
        />
    </div>
  );
}

export default InputField;
