import React from "react";
import { Link } from "react-router-dom";
import Like from "./common/like";
import Table from "./common/table";

const MoviesTable = props => {
  const { movies, onDelete, onLike, onSort, sortColumn } = props;
  const columns = [
    {
      path: "title",
      label: "Title",
      content: movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: movie => <Like liked={movie.liked} onLike={() => onLike(movie._id)} />
    },
    {
      key: "delete",
      content: movie => (
        <button className="btn btn-danger" onClick={() => onDelete(movie._id)}>
          Delete
        </button>
      )
    }
  ];

  return <Table data={movies} columns={columns} sortColumn={sortColumn} onSort={onSort} />;
};

export default MoviesTable;
