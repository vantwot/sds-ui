import React, { useState } from 'react';

/* Components */
import ShowMoreButton from './ShowMoreButton';

/* Utilities */
import { Link } from 'react-router-dom';

/* UI Library Components */
import { Button } from 'antd';

const SubjectsHorizontalList = ({ subjectsList, core }) => {
  const [subjectsQuantity, setSubjectsQuantity] = useState(10);
  const [showingAll, setShowingAll] = useState(false);

  return (
    <div>
      {subjectsList.slice(0, subjectsQuantity).map((subject) => (
        <Link
          key={subject.id}
          to={`/app/subjects?id=${subject.id}`}
          onClick={() => core.setURL(`/app/subjects?id=${subject.id}`)}
        >
          <Button type="link">{subject.name}</Button>
        </Link>
      ))}
      {subjectsList.length > 10 && (
        <ShowMoreButton
          showingAll={showingAll}
          setAuthorsQuantity={setSubjectsQuantity}
          setShowingAll={setShowingAll}
          length={subjectsList.length}
        />
      )}
    </div>
  );
};

export default SubjectsHorizontalList;
