import React from "react";

const ListGroup = ({
  items,
  textPropety,
  valueProperty,
  onItemSelect,
  selectedItem
}) => {
  // console.log(items);
  return (
    <ul className="list-group">
      {items.map(item => (
        <li
          key={item[valueProperty]}
          onClick={() => onItemSelect(item)}
          className={
            item === selectedItem ? "list-group-item active" : "list-group-item"
          }
          style={{ cursor: "pointer" }}
        >
          {item[textPropety]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  textPropety: "name",
  valueProperty: "_id"
};
export default ListGroup;
