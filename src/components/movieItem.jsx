import React from "react";
import Like from "./common/like";

export default function MovieItem({ title, genre, stock, rate, liked, id, onDelete, onLike }) {
  return (
    <tr>
      <td>{title}</td>
      <td>{genre}</td>
      <td>{stock}</td>
      <td>{rate}</td>
      <td>
        <Like liked={liked} onLike={() => onLike(id)} />
      </td>
      <td />
    </tr>
  );
}
