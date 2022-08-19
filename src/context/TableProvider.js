import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import myContext from './myContext';

function TableProvider({ children }) {
  const [planets, setPlanets] = useState([]);

  const [filterByName, setFilterText] = useState({ name: '' });

  const [selecteds, setSelecteds] = useState({ column: 'population',
    operator: 'maior que',
    value: '0' });

  const [filterNumber, setFilterNumber] = useState([]);

  const [planetFilters, setPlanetFilters] = useState([]);

  const [filter, setFilter] = useState(['population', 'orbital_period', 'diameter',
    'rotation_period', 'surface_water']);

  const URL = 'https://swapi-trybe.herokuapp.com/api/planets/';
  useEffect(() => {
    const fetchTable = async () => {
      const require = await fetch(URL);
      const result = await require.json();
      setPlanets(result.results);
      setPlanetFilters(result.results);
    };
    fetchTable();
  }, []);

  useEffect(() => {
    filterNumber.forEach((filters) => {
      const { column, operator, value } = filters;
      if (operator === 'maior que') {
        setPlanetFilters(planetFilters
          .filter((planet) => planet[column] > Number(value)));
      } else if (operator === 'menor que') {
        setPlanetFilters(planetFilters
          .filter((planet) => planet[column] < Number(value)));
      } else {
        setPlanetFilters(planetFilters
          .filter((planet) => planet[column] === value));
      }
    });
  }, [filterNumber, filter]);

  return (

    <myContext.Provider
      value={ {
        planets,
        setPlanetFilters,
        filterByName,
        setFilterText,
        selecteds,
        setSelecteds,
        filterNumber,
        setFilterNumber,
        planetFilters,
        filter,
        setFilter,
      } }
    >
      { children }
    </myContext.Provider>
  );
}

TableProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TableProvider;
