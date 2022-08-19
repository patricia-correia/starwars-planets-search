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
  }, [filterNumber]);

  return (

    <myContext.Provider
      value={ {
        planets,
        filterByName,
        setFilterText,
        selecteds,
        setSelecteds,
        filterNumber,
        setFilterNumber,
        planetFilters,
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
