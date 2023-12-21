// App.js
import React, { useState, useEffect } from 'react';
import Note from './Note';
import './App.css';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ title: '', content: '', color: '#fff' });
  const [isDeleteConfirmationVisible, setIsDeleteConfirmationVisible] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    if (storedNotes.length > 0) {
      setNotes(storedNotes);
    }
  }, []);

  const addNote = () => {
    setNotes([newNote, ...notes]);
    setNewNote({ title: '', content: '', color: '#fff' });
    updateLocalStorage([...notes, newNote]);
  };

  const confirmDelete = (index) => {
    setIsDeleteConfirmationVisible(true);
    setNoteToDelete(index);
  };

  const deleteNote = () => {
    const updatedNotes = [...notes];
    updatedNotes.splice(noteToDelete, 1);
    setNotes(updatedNotes);
    setIsDeleteConfirmationVisible(false);
    setNoteToDelete(null);
    updateLocalStorage(updatedNotes);
  };

  const cancelDelete = () => {
    setIsDeleteConfirmationVisible(false);
    setNoteToDelete(null);
  };

  const updateNote = (index, updatedNote) => {
    const updatedNotes = [...notes];
    updatedNotes[index] = updatedNote;
    setNotes(updatedNotes);
    updateLocalStorage(updatedNotes);
  };

  const updateLocalStorage = (updatedNotes) => {
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app">
      <div className="note-form">
        <input
          type="text"
          placeholder="Title"
          value={newNote.title}
          onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
        />
        <textarea
          placeholder="Content"
          value={newNote.content}
          onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
        />
        <input
          type="color"
          value={newNote.color}
          onChange={(e) => setNewNote({ ...newNote, color: e.target.value })}
        />
        <button onClick={addNote}>Add Note</button>
      </div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search notes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="note-list">
        {filteredNotes.map((note, index) => (
          <Note
            key={index}
            index={index}
            note={note}
            deleteNote={confirmDelete}
            updateNote={updateNote}
          />
        ))}
      </div>
      {isDeleteConfirmationVisible && (
        <div className="delete-confirmation">
          <p>Are you sure you want to delete this note?</p>
          <button onClick={deleteNote}>Yes</button>
          <button onClick={cancelDelete}>No</button>
        </div>
      )}
    </div>
  );
};

export default App;
