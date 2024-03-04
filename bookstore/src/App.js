import React from 'react';
import AuthorsList from './components/AuthorsList';
import PublishersList from './components/PublishersList';
import BooksList from './components/BooksList';

const App = () => {
  return (
    <div>
      <AuthorsList />
      <PublishersList />
      <BooksList />
    </div>
  );
};

export default App;
