/* Utilities */
import history from "../history";
const queryString = require("query-string");

export const onPageChange = ({ page, pageSize, setURL }) => {
  const parsed = queryString.parse(history.location.search);
  const newQuery = {
    ...parsed,
    max: pageSize.toString(),
    page: page.toString(),
  };
  history.push(
    `${history.location.pathname}?${queryString.stringify(newQuery)}`
  );
  setURL(`${history.location.pathname}?${queryString.stringify(newQuery)}`);
};
