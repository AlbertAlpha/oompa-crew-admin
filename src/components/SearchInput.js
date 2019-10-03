import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const SearchInput = ({initialValue, onChangeSearchValue}) => {

  function onChange(event) {
    const value = event.target.value;
    // at least user needs to type two characters to start searching
    // if (value && value.length === 1) return false;
    onChangeSearchValue(value);
  }

  return (
    <div className="input-group mb-3">
      <input id="search" type="text" className="form-control" placeholder="Search"
             value={initialValue} onChange={onChange} />
      <div className="input-group-append">
        <span className="input-group-text"><FontAwesomeIcon icon="search"/></span>
      </div>
    </div>
  );
};

export default SearchInput;
