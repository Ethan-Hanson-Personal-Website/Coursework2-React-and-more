import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export default function SelectedContact({ selectedContactId, setSelectedContactId }) {
    const [contact, setContact] = useState(null);

    useEffect(() => {
        async function fetchContact() {
          const response = await fetch(`https://fsa-jsonplaceholder-69b5c48f1259.herokuapp.com/users/${selectedContactId}`);
          const data = await response.json();
          setContact(data);
        }
      
        fetchContact();
      }, [selectedContactId]);

      return (
        <div>
          <h1>{contact?.name}</h1>
          <p>{contact?.email}</p>
          <p>{contact?.phone}</p>
          <p>{contact?.company?.name}</p>
          <button onClick={() => setSelectedContactId(null)}>Back to list</button>
        </div>
      );
}

SelectedContact.propTypes = {
    selectedContactId: PropTypes.number,
    setSelectedContactId: PropTypes.func.isRequired,
  };