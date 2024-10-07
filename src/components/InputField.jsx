import React from "react";

const InputField = ({ label, name, value, onChange, error }) => (
  <div>
    <label>{label}</label>
    <input type="number" name={name} value={value} onChange={onChange} />
    {error && <p style={{ color: "red" }}>{error}</p>}
  </div>
);

export default InputField;