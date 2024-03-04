import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PublishersList() {
  const [publishers, setPublishers] = useState([]);
  const [newPublisherName, setNewPublisherName] = useState('');
  const [updatedPublisherName, setUpdatedPublisherName] = useState('');

  const fetchPublishers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/publishers/all');
      setPublishers(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des éditeurs', error);
    }
  };

  useEffect(() => {
    fetchPublishers();
  }, []);

  const handleAddPublisher = async () => {
    try {
      await axios.post('http://localhost:5000/publishers/add', { name: newPublisherName });
      setNewPublisherName('');
      fetchPublishers();
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'éditeur', error);
    }
  };

  const handleUpdatePublisher = async (publisherName) => {
    try {
      await axios.put(`http://localhost:5000/publishers/update/${publisherName}`, { newName: updatedPublisherName });
      setUpdatedPublisherName('');
      fetchPublishers();
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'éditeur', error);
    }
  };

  const handleDeletePublisher = async (publisherName) => {
    try {
      await axios.delete(`http://localhost:5000/publishers/delete/${publisherName}`);
      fetchPublishers();
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'éditeur', error);
    }
  };

  return (
    <div>
      <h1>Liste des Éditeurs</h1>
      <table>
        <thead>
          <tr>
            <th>Nom de l'éditeur</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {publishers.map(publisher => (
            <tr key={publisher._id}>
              <td>{publisher.name}</td>
              <td>
                <input
                  type="text"
                  value={updatedPublisherName}
                  onChange={(e) => setUpdatedPublisherName(e.target.value)}
                />
                <button onClick={() => handleUpdatePublisher(publisher.name)}>Mettre à jour</button>
                <button onClick={() => handleDeletePublisher(publisher.name)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Ajouter un nouvel éditeur</h2>
      <input type="text" value={newPublisherName} onChange={(e) => setNewPublisherName(e.target.value)} />
      <button onClick={handleAddPublisher}>Ajouter</button>
    </div>
  );
}

export default PublishersList;
