import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AuthorsList = () => {
    const [authors, setAuthors] = useState([]);
  const [newAuthorName, setNewAuthorName] = useState('');
  const [newAuthorNat, setNewAuthorNat] = useState('');

  const [updatedAuthorName, setUpdatedAuthorName] = useState('');

  const fetchAuthors = async () => {
    try {
      const response = await axios.get('http://localhost:5000/authors/all');
      setAuthors(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des auteurs', error);
    }
  };

  useEffect(() => {
    fetchAuthors();
  }, []); 

  const handleAddAuthor = async () => {
    try {
      await axios.post('http://localhost:5000/authors/add', { name: newAuthorName ,nationality: newAuthorNat});
      setNewAuthorName('');
      setNewAuthorNat('');
      fetchAuthors();
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'auteur', error);
    }
  };

  const handleUpdateAuthor = async (authorId) => {
    try {
      await axios.put(`http://localhost:5000/authors/update/${authorId}`, { newName: updatedAuthorName });
      setUpdatedAuthorName('');
      fetchAuthors();
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'auteur', error);
    }
  };

  const handleDeleteAuthor = async (authorName) => {
    try {
      await axios.delete(`http://localhost:5000/authors/delete/${authorName}`);
      fetchAuthors();
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'auteur', error);
    }
  };

  return (
    <div>
      <h1>Liste des Auteurs</h1>
      <table>
        <thead>
          <tr>
            <th>Nom de l'auteur</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {authors.map(author => (
            <tr key={author._id}>
              <td>{author.name}</td>
              <td>
                {/* <input
                  type="text"
                  value={updatedAuthorName}
                  onChange={(e) => setUpdatedAuthorName(e.target.value)}
                /> */}
                <button onClick={() => handleUpdateAuthor(author._id)}>Mettre à jour</button>
                <button onClick={() => handleDeleteAuthor(author.name)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Ajouter un nouvel auteur</h2>
      Nom : <input type="text" value={newAuthorName} onChange={(e) => setNewAuthorName(e.target.value)} />
      nationalité : <input type="text" value={newAuthorNat} onChange={(e) => setNewAuthorNat(e.target.value)} />

      <button onClick={handleAddAuthor}>Ajouter</button>
    </div>
  );
}
  
export default AuthorsList;
