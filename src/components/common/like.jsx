import React from "react";

const Like = props => {
  return (
    <i
      className={`fa fa-heart${props.liked ? "" : "-o"}`}
      aria-hidden="true"
      onClick={props.onLike}
    />
  );
};

export default Like;
