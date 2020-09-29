import React from 'react';

const SearchBar = (props) => {

  return (
    <form className="form-inline ">
      <input
        className="form-control "
        type="text"
        name="search"
        placeholder="Search by #"
        aria-label="Search"
        value={props.value}
        onChange={props.onChange}
        onKeyDown={props.onKeyDown}
      />
    </form>
  )
}

export default SearchBar;
