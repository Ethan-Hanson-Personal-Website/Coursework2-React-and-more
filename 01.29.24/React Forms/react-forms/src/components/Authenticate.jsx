import React from "react";
import { useState } from "react";
import PropTypes from 'prop-types';

export default function Authenticate({ token }) {
    const [successMessage, setSuccessMessage] = useState(null);
    const [username, setUsername] = useState(null);
    const [validationMessage, setValidationMessage] = useState(null);

    const [error, setError] = useState(null);

    async function handleClick() {
        if (username && username.length < 8) {
            setValidationMessage("Username must be at least 8 characters long");
            return;
        }
        try {
            const response = await fetch("https://fsa-jwt-practice.herokuapp.com/authenticate", {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            } 
            );
            const result = await response.json();
            setSuccessMessage(result.message);
            setUsername(result.data.username);
    } catch (error) {
            setError(error.message);
        }
    }
    return (
        <div>
      <h2>Authenticate</h2>
      {successMessage && <p>{successMessage}</p>}
      {username && <p>Username: {username}</p>}
      {error && <p>{error}</p>}
      {validationMessage && <p>{validationMessage}</p>}
      <button onClick={handleClick}>Authenticate Token!</button>
    </div>
  );
}

Authenticate.propTypes = {
    token: PropTypes.string.isRequired,
};