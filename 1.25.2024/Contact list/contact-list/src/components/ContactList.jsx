import React, { useState, useEffect } from 'react';
import ContactRow from './ContactRow';
import PropTypes from 'prop-types';

export default function ContactList({ selectedContactId, setSelectedContactId }) {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    async function fetchContacts() {
      try {
        const response = await fetch(`https://fsa-jsonplaceholder-69b5c48f1259.herokuapp.com/users/${selectedContactId}`)
        const result = await response.json();
        setContacts(result);
      } catch (error) {
        console.error(error);
      }
    }
    fetchContacts();
  }, [selectedContactId]);

  return (
    <table>
      <thead>
        <tr>
          <th colSpan="3">Contact List</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Name</td>
          <td>Email</td>
          <td>Phone</td>
        </tr>
        {contacts.map((contact) => (
          <ContactRow key={contact.id} contact={contact} setSelectedContactId={setSelectedContactId} />
        ))}
      </tbody>
    </table>
  );
}
ContactList.propTypes = {
  setSelectedContactId: PropTypes.func.isRequired,
  selectedContactId: PropTypes.number,
};