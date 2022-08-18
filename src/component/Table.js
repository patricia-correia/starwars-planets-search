import React, { useContext } from 'react';
import myContext from '../context/myContext';

function Table() {
  const { planets, filterByName, planetFilters } = useContext(myContext);
  const { name } = filterByName;

  function filterPlanets() {
    if (name.length !== 0) {
      return planets.filter((planet) => (planet
        .name).toLowerCase().search(name.toLowerCase()) !== Number('-1'));
    } if (planetFilters.length !== 0) {
      return planetFilters;
    }
    return planets;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Rotation Period</th>
          <th>Orbital Period</th>
          <th>Diameter</th>
          <th>Climate</th>
          <th>Gravity</th>
          <th>Terrain</th>
          <th>Surface Water</th>
          <th>Population</th>
          <th>Films</th>
          <th>Created</th>
          <th>Edited</th>
          <th>URL</th>
        </tr>
      </thead>
      <tbody>
        {
          filterPlanets().map((planet) => (
            <tr key={ planet.id }>
              <td>{planet.name}</td>
              <td>{planet.rotation_period}</td>
              <td>{planet.orbital_period}</td>
              <td>{planet.diameter}</td>
              <td>{planet.climate}</td>
              <td>{planet.gravity}</td>
              <td>{planet.terrain}</td>
              <td>{planet.superface_water}</td>
              <td>{planet.population}</td>
              <td>{planet.films}</td>
              <td>{planet.created}</td>
              <td>{planet.edited}</td>
              <td>{planet.url}</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  );
}

export default Table;
