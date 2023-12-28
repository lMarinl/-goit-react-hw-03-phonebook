import React from 'react';
import css from './Filter.module.css';

export const Filter = ({ filter, handleChangeFilter }) => {
  return (
    <label className={css.labelFilter}>
      Search contacts by name
      <input
        className={css.inputFilter}
        type="text"
        value={filter}
        onChange={handleChangeFilter}
      />
    </label>
  );
};
