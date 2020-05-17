import React from 'react';

const Search = (props) => {
  const handleChange = (e) => {
    props.searchValue(e.target.value);
  };
  return (
    <form method="POST " name="formName">
      <label>
        Search Recipes:
        <input type="text" name="searchTerm" onChange={handleChange} />
      </label>
    </form>
  );
};

export default Search;
