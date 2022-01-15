import React from 'react';
import Note from '../interfaces/note.interface';

interface NoteSnippetProps {
  note: Note;
  setIsActive: (id: string) => void;
}

const NoteSnippet: React.FC<NoteSnippetProps> = ({ note, setIsActive }) => {
  return (
    <div className="cursor-pointer mb-8" onClick={() => setIsActive(note._id)}>
      <h3>{note.title}</h3>
      <p>{note.body.split('').slice(0, 35).join('')}</p>
    </div>
  );
};

export default NoteSnippet;
