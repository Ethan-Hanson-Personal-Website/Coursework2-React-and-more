/**
 * 1. Style the modal component:
 *      - The ".modal-overlay" div should fill the entire page and overlay all content on the page.
 *      - The ".modal" div should be centered within the .modal-overlay.
 *
 * 2. Using the provided grid html. Layout the grid to be 3 grid-items in a row
 *    with a 24px gap between.
 *
 * 3. Make an HTTP request using PEOPLE_URL and pass that data to the <Grid /> component.
 *    Loop over the provided data and create a grid-item for each item. Display the name for each.
 *
 * 4. Create a search bar to query `PEOPLE_URL?search=[search value]` and re-populate the grid
 *    with those results.
 *    e.g. Search: PEOPLE_URL?search=Luke
 *
 */
import "./index.css";
import { PEOPLE_URL } from "./constants";
import React, { useEffect, useState } from "react";

export default function App() {
  const [people, setPeople] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredPeople, setFilteredPeople] = useState([]);

  useEffect(() => {
    fetch(PEOPLE_URL)
      .then(response => response.json())
      .then(data => {
        setPeople(data.results);
        setFilteredPeople(data.results);
      });
  }, []);

  const searchPeople = (searchValue) => {
    setSearch(searchValue);
    if (searchValue !== '') {
      const filteredData = people.filter((person) =>
        person.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredPeople(filteredData);
    } else {
      setFilteredPeople(people);
    }
  };

  return (
    <div className="App">
    Hello There
    <div>
      <input type="text" value={search} onChange={e => searchPeople(e.target.value)} placeholder="Search" />
    </div>
    <Modal />
      {/* <Grid /> */}
      <Grid people={filteredPeople} />
    </div>
  );
}

function Modal() {
  return (
    <>
      <div className="modal-overlay" />
      <div className="modal">Modal Div</div>
    </>
  );
}

function Grid({ people }) {
  return (
    <div className="grid">
     {people.map((person, index) => (
       <div className="grid-item" key={index}>
         {person.name}
       </div>
     ))}
    </div>
  );
}