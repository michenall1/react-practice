import React from "react";

const SearchBox = ({ value, onChange }) => {
  return (
    <input
      className="form-control my-3"
      placeholder="Search..."
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  );
};

export default SearchBox;
