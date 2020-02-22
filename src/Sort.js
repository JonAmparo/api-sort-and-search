import React, { useState } from 'react';

const Sort = ({ sort, sortType }) => {
  const [sorted, setSorted] = useState(false);

  const handleToggle = () => {
    if (sorted) {
      sort('asc');
    } else {
      sort('desc');
    }
    setSorted(!sorted);
  };

  return (
    <div className='flex'>
      <label className='mr-3 mt-2'>Current order: {sortType}</label>
      <input checked={sorted} onChange={handleToggle} type='checkbox' />
    </div>
  );
};

export default Sort;
