import React from "react";

// columns: array
// sortColumn: object
// onSort: function

const TableHeader = ({ columns, sortColumn, onSort }) => {
  const raiseSort = path => {
    const newSortColumn = { ...sortColumn };
    if (newSortColumn.path === path) {
      newSortColumn.order = newSortColumn.order === "asc" ? "desc" : "asc";
    } else {
      newSortColumn.path = path;
      newSortColumn.order = "asc";
    }
    onSort(newSortColumn);
  };

  const renderSortIcon = column => {
    if (column.path !== sortColumn.path) return null;
    if (sortColumn.order === "asc") return <i className="fa fa-sort-asc" />;
    else return <i className="fa fa-sort-desc" />;
  };

  return (
    <thead>
      <tr>
        {columns.map(col => (
          <th className="clickable" key={col.path || col.key} onClick={() => raiseSort(col.path)}>
            {col.label} {renderSortIcon(col)}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
