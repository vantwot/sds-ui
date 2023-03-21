import React, { useEffect } from 'react';

/* Utilities */
import { APIRequest } from '../../apis/api';
import { useLocation } from 'react-router';

/* Components */
import ErrorWarning from '../ErrorWarning';
import LoadingCard from '../LoadingCard';
import EmptyCard from '../EmptyCard';

/* Charts */
import WordCloudChart from '../charts/WordCloudChart';

const SubjectsWrapper = ({ core }) => {
  const location = useLocation();
  const [state, setState] = APIRequest(
    `${location.pathname}${location.search}&data=subjects&limit=20`
  );

  useEffect(() => {
    setState(`${location.pathname}${location.search}&data=subjects&limit=20`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  if (state.isError) {
    return <ErrorWarning />;
  }
  if (state.isLoading) {
    return <LoadingCard />;
  }
  if (state.isEmpty || state?.data?.data?.length === 0) {
    return <EmptyCard />;
  }
  return (
    <div>
      <WordCloudChart
        title="Temas"
        data={state.data.data}
        core={core}
        state={state}
      />
    </div>
  );
};

export default SubjectsWrapper;
