import React from "react";
import _ from "lodash";

const TableBody = ({ data, columns, onDelete, onLike }) => {
  const renderCell = (item, column) => {
    if (column.content) return column.content(item);
    else return _.get(item, column.path);
  };

  const createKey = (item, column) => {
    return item._id + (column.path || column.key);
  };

  return (
    <tbody>
      {data.map(item => (
        <tr key={item._id}>
          {columns.map(col => (
            <td key={createKey(item, col)}>{renderCell(item, col)}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
