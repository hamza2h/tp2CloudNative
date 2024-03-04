import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BooksList() {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({
    title: '',
    authorName: '',
    publisherName: '',
    category: '',
    releaseYear: '',
  });

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/books/all');
      setBooks(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des livres', error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleAddBook = async () => {
    try {
      await axios.post('http://localhost:5000/books/add', newBook);
      setNewBook({
        title: '',
        authorName: '',
        publisherName: '',
        category: '',
        releaseYear: '',
      });
      fetchBooks();
    } catch (error) {
      console.error('Erreur lors de l\'ajout du livre', error);
    }
  };

  const handleDeleteBook = async (title) => {
    try {
      await axios.delete(`http://localhost:5000/books/delete/${title}`);
      fetchBooks();
    } catch (error) {
      console.error('Erreur lors de la suppression du livre', error);
    }
  };

  return (
    <div>
      <h1>Liste des Livres</h1>
      <table>
        <thead>
          <tr>
            <th>Titre</th>
            <th>Auteur</th>
            <th>Éditeur</th>
            <th>Catégorie</th>
            <th>Année de sortie</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {books.map(book => (
            <tr key={book._id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.publisher.name}</td>
              <td>{book.category}</td>
              <td>{book.releaseYear}</td>
              <td>
                <button onClick={() => handleDeleteBook(book.title)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Ajouter un nouveau livre</h2>
      <label>Titre: <input type="text" value={newBook.title} onChange={(e) => setNewBook({ ...newBook, title: e.target.value })} /></label>
      <label>Auteur: <input type="text" value={newBook.authorName} onChange={(e) => setNewBook({ ...newBook, authorName: e.target.value })} /></label>
      <label>Éditeur: <input type="text" value={newBook.publisherName} onChange={(e) => setNewBook({ ...newBook, publisherName: e.target.value })} /></label>
      <label>Catégorie: <input type="text" value={newBook.category} onChange={(e) => setNewBook({ ...newBook, category: e.target.value })} /></label>
      <label>Année de sortie: <input type="text" value={newBook.releaseYear} onChange={(e) => setNewBook({ ...newBook, releaseYear: e.target.value })} /></label>
      <button onClick={handleAddBook}>Ajouter</button>
    </div>
  );
}

export default BooksList;
