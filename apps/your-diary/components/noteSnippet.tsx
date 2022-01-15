import React from 'react';
import Note from '../interfaces/note.interface';

interface NoteSnippetProps {
  note: Note;
  deleteNote: (id: string) => void;
  setIsActive: (id: string) => void;
}

const NoteSnippet: React.FC<NoteSnippetProps> = ({
  note,
  setIsActive,
  deleteNote,
}) => {
  return (
    <div className="flex cursor-pointer mb-8 justify-between items-center">
      <div onClick={() => setIsActive(note._id)}>
        <h3 className="font-bold">{note.title}</h3>
        <p>{note.body.split('').slice(0, 35).join('')}</p>
      </div>
      <div
        onClick={() => deleteNote(note._id)}
        className="text-sm text-rose-500 hover:scale-110 transition-transform"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
};

export default NoteSnippet;
