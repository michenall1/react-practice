import React from "react";

const Select = ({ name, options, label, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select className="form-control" name={name} id={name} {...rest}>
        <option value="" />
        {options.map(({ _id, name }) => (
          <option key={_id} value={_id}>
            {name}
          </option>
        ))}
      </select>
      {error && <div classNameName="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Select;
