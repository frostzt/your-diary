import React from 'react';
import Note from '../interfaces/note.interface';
import NoteSnippet from './noteSnippet';

interface SidebarProps {
  name: string;
  notes: Note[];
  createNewNote: () => void;
  setIsActive: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  name,
  createNewNote,
  notes,
  setIsActive,
}) => {
  return (
    <div className="fixed h-screen w-1/4 bg-slate-50 p-4">
      <div className="flex items-center justify-between mt-2 mb-10">
        <h2 className="text-center text-lg">{name}</h2>
        <div
          onClick={createNewNote}
          className="bg-rose-500 h-8 w-8 flex justify-center items-center rounded-sm cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </div>
      </div>
      <div className="flex flex-col">
        {notes.length > 0 &&
          notes.map((note) => (
            <NoteSnippet setIsActive={setIsActive} note={note} key={note._id} />
          ))}
      </div>
    </div>
  );
};

export default Sidebar;
