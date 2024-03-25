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

export default function App() {
  return (
    <div className="App">
      Hello There
      <Modal />
      {/* <Grid /> */}
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
      <div className="grid-item">Name 1</div>
      <div className="grid-item">Name 2</div>
      <div className="grid-item">Name 3</div>
      <div className="grid-item">Name 4</div>
      <div className="grid-item">Name 5</div>
      <div className="grid-item">Name 6</div>
    </div>
  );
}