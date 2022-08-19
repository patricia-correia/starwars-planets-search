import React, { useContext } from 'react';
import myContext from '../context/myContext';

function SearchInput() {
  const { planets, setPlanetFilters,
    filterByName, setFilterText,
    selecteds, setSelecteds,
    filterNumber, setFilterNumber,
    filter, setFilter } = useContext(myContext);

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
    setFilter(filter.filter((columns) => columns !== selecteds.column));
    setSelecteds({
      column: filter[0],
      operator: 'maior que',
      value: '0',
    });
  }

  function handleRemoveFilter(e) {
    setFilter([...filter, e.column]);
    setFilterNumber(filterNumber.filter((filters) => filters.column !== e.column));
    setPlanetFilters(planets);
  }

  function handleRemoveAllFilters() {
    setFilter(['population', 'orbital_period', 'diameter',
      'rotation_period', 'surface_water']);
    setFilterNumber([]);
    setPlanetFilters([]);
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
            {
              filter.map((options) => (
                <option key={ options } value={ options }>{options}</option>
              ))
            }

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

        <section>
          <button
            type="button"
            data-testid="button-remove-filters"
            onClick={ handleRemoveAllFilters }
          >
            Delete All Filters
          </button>
        </section>

      </form>

      <div>
        {
          filterNumber.map((filtered) => (
            <div
              key={ filtered.column }
              data-testid="filter"
            >
              <span>{filtered.column}</span>
              <span>{filtered.operator}</span>
              <span>{filtered.value}</span>

              <button type="button" onClick={ () => { handleRemoveFilter(filtered); } }>
                X
              </button>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default SearchInput;
