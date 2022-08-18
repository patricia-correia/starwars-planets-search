import React, { useContext } from 'react';
import myContext from '../context/myContext';

function SearchInput() {
  const { filterByName, setFilterText,
    selecteds, setSelecteds,
    filterNumber, setFilterNumber } = useContext(myContext);

  function handleChange({ target }) {
    const { name, value } = target;
    setFilterText({ [name]: value });
  }

  function handleFilters({ target }) {
    const { name, value } = target;
    setSelecteds({ ...selecteds, [name]: value });
  }

  function handleClick() {
    setFilterNumber([...filterNumber, selecteds]);
    setSelecteds({
      column: 'population',
      operator: 'maior que',
      value: '0',
    });
  }

  const { name } = filterByName;
  const { column, operator, value } = selecteds;

  return (
    <div>
      <div className="search-input">
        <label htmlFor="filterName">
          <input
            id="filterName"
            type="text"
            data-testid="name-filter"
            value={ name }
            name="name"
            onChange={ handleChange }
            placeholder="Search Name Of Planets"
          />
        </label>
      </div>

      <form className="form-filter">
        <label htmlFor="column-filter">
          Column
          <select
            name="column"
            id="column-filter"
            value={ column }
            onChange={ handleFilters }
            data-testid="column-filter"
          >
            <option value="population">population</option>
            <option value="orbital_period">orbital_period</option>
            <option value="diameter">diameter</option>
            <option value="rotation_period">rotation_period</option>
            <option value="surface_water">surface_water</option>
          </select>
        </label>

        <label htmlFor="operator-filter">
          Operator
          <select
            name="operator"
            id="operator-filter"
            value={ operator }
            onChange={ handleFilters }
            data-testid="comparison-filter"
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>

        <label htmlFor="value-filter">
          Value
          <input
            type="number"
            id="value-filter"
            name="value"
            value={ value }
            onChange={ handleFilters }
            data-testid="value-filter"
          />
        </label>

        <button
          className="button"
          type="button"
          onClick={ handleClick }
          data-testid="button-filter"
        >
          Filter
        </button>
      </form>
    </div>
  );
}

export default SearchInput;
