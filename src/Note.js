// Note.js
import React, { useState } from 'react';
import './Note.css';

const Note = ({ index, note, deleteNote, updateNote }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedNote, setEditedNote] = useState(note);

  const saveChanges = () => {
    updateNote(index, editedNote);
    setIsEditing(false);
  };

  return (
    <div className="note" style={{ backgroundColor: note.color }}>
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedNote.title}
            onChange={(e) => setEditedNote({ ...editedNote, title: e.target.value })}
          />
          <textarea
            value={editedNote.content}
            onChange={(e) => setEditedNote({ ...editedNote, content: e.target.value })}
          />
          <button onClick={saveChanges}>Save</button>
        </>
      ) : (
        <>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => deleteNote(index)}>Delete</button>
        </>
      )}
    </div>
  );
};

export default Note;
