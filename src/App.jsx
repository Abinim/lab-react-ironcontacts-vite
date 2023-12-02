import React, { useState } from 'react';
import './App.css';
import contactsData from './contacts.json';

const App = () => {
  const [contactsList, setContactsList] = useState(contactsData.slice(0, 6));

  const addRandomContact = () => {
    const remainingContacts = contactsData.filter(
      contact => !contactsList.includes(contact)
    );
    const randomContact =
      remainingContacts[Math.floor(Math.random() * remainingContacts.length)];
    setContactsList(prevContacts => [...prevContacts, randomContact]);
  };

  const sortByName = () => {
    const sortedContacts = [...contactsList].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setContactsList(sortedContacts);
  };

  const sortByPopularity = () => {
    const sortedContacts = [...contactsList].sort(
      (a, b) => b.popularity - a.popularity
    );
    setContactsList(sortedContacts);
  };

  const removeContact = id => {
    const updatedContacts = contactsList.filter(contact => contact.id !== id);
    setContactsList(updatedContacts);
  };

  return (
    <div className='App'>
      <h1>IronContacts</h1>
      <button onClick={addRandomContact}>Add Random Contact</button>
      <button onClick={sortByName}>Sort by Name</button>
      <button onClick={sortByPopularity}>Sort by Popularity</button>
      <table>
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>
              Won <br /> Oscar
            </th>
            <th>
              Won <br /> Emmy
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contactsList.map((contact, index) => (
            <tr key={index}>
              <td>
                <img
                  src={contact.pictureUrl}
                  alt={`Contact ${index + 1}`}
                  className='contact-image'
                  style={{ width: '80px', height: '120px' }}
                />
              </td>
              <td>{contact.name}</td>
              <td>{contact.popularity.toFixed(2)}</td>

              <td>{contact.wonOscar ? '🏆' : ''}</td>
              <td>{contact.wonEmmy ? '🌟' : ''}</td>
              <td>
                <button onClick={() => removeContact(contact.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
