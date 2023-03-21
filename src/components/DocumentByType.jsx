import React, { useState, useEffect } from "react";

/* Utilities */
import { APIRequest } from "../apis/api";

/* Components */
import DocumentList from "./DocumentList";
import ErrorWarning from "./ErrorWarning";
import LoadingCard from "./LoadingCard";

const DocumentByType = ({ type, core, literature = false }) => {
  const [pagination, setPagination] = useState({ max: 10, page: 1 });
  const [sort, setSort] = useState("citations");
  const [state, setUrl] = APIRequest(
    `${core.URL}${literature ? "" : "&data=production"}&type=${type}&max=${
      pagination.max
    }&page=${pagination.page}&sort=${sort}`
  );
  const tools = {
    pagination,
    setPagination,
    sort,
    setSort,
    URL: core.URL,
    setUrl,
  };

  useEffect(() => {
    setUrl(
      `${core.URL}${literature ? "" : "&data=production"}&type=${type}&max=${
        pagination.max
      }&page=${pagination.page}&sort=${sort}`
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination, sort]);

  if (state.isError) {
    return <ErrorWarning />;
  }
  if (state.isLoading) {
    return <LoadingCard />;
  }
  return (
    <DocumentList data={state.data} tools={tools} title={type} core={core} />
  );
};

export default DocumentByType;
