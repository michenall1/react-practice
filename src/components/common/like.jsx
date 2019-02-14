import React from "react";

const Like = ({ liked, onLike }) => {
  return <i className={`fa fa-heart${liked ? "" : "-o"}`} aria-hidden="true" onClick={onLike} />;
};

export default Like;
