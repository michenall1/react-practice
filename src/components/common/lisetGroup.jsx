import React from "react";

const ListGroup = props => {
  const { items, valueProperty, textProperty, selectedItem, onItemSelect } = props;
  return (
    <ul className="list-group">
      {items.map(item => (
        <li
          onClick={() => onItemSelect(item)}
          className={`list-group-item ${item === selectedItem ? "active" : ""}`}
          key={item[valueProperty]}
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id"
};

export default ListGroup;
