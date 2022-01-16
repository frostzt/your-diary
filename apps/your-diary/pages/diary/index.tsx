import axios from 'axios';
import { NextPage } from 'next';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Editor from '../../components/editor';
import Sidebar from '../../components/sidebar';
import CustomError from '../../interfaces/error.interface';
import Note from '../../interfaces/note.interface';

const DiaryPage: NextPage = () => {
  const router = useRouter();
  const { data, status } = useSession();
  const [notes, updateNotes] = useState<Note[]>([]);

  // Editor
  const [active, setActive] = useState('');
  const [body, setBody] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [isCreating, setIsCreating] = useState(false);

  /**
   * If the user is not logged in Redirect
   */
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/');
    }
  }, [status, router]);

  /**
   * Fetch all notes by the user and update the Notes Array State
   */
  useEffect(() => {
    if (status === 'authenticated') {
      const fetchData = async () => {
        try {
          const response = await axios.get('/api/note');
          updateNotes(response.data.data.notes);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          error.response?.errors?.forEach((error: { message: string }) => {
            console.error(error.message);
          });
        }
      };

      fetchData();
    }
  }, [status]);

  // Handlers
  /**
   * Updates the body of the editor
   * @param value Update to what value
   */
  const updateBody = (value: string) => {
    setBody(value);
  };

  /**
   * Updates the title of the editor
   * @param value Update to what value
   */
  const updateTitle = (value: string) => {
    setTitle(value);
  };

  /**
   * Sets a note to be actively editing
   * @param id Id of the note to be active
   */
  const setActiveState = (id: string) => {
    setActive(id);

    const current = notes.find((note) => note._id === id);
    if (current) {
      setIsCreating(true);
      setTitle(current.title);
      setBody(current.body);
    }
  };

  // API
  /**
   * On click of the Add new note button creates a new note on the Database
   */
  const createNewNote = async () => {
    try {
      const response = await axios.post('/api/note', {
        title: 'Untitled',
        body: 'Start writing here!',
      });
      if (response.status === 201) {
        updateNotes([...notes, response.data.data.note]);
        toast.success('Created new note!');
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      error.response?.errors?.forEach((error: CustomError) => {
        console.error(error.message);
      });
    }
  };

  /**
   * Update the given note on the database
   */
  const updateNote = async () => {
    try {
      const response = await axios.put('/api/note', {
        noteId: active,
        title,
        body,
      });

      if (response.status === 200) {
        const allNotes = notes;
        const index = allNotes.findIndex((note) => note._id === active);
        allNotes.splice(index, 1);
        updateNotes([...allNotes, response.data.data.note]);
        toast.success('Updated successfully!');
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      error.response?.errors?.forEach((error: CustomError) => {
        console.error(error.message);
      });
    }
  };

  /**
   * Delete the specified note
   */
  const deleteNote = async (id: string) => {
    try {
      const response = await axios.delete(`/api/note/${id}`);

      if (response.status === 204) {
        if (active === id) {
          setActive('');
          setTitle('');
          setBody('');
          setIsCreating(false);
        }

        const allNotes = notes;
        const index = allNotes.findIndex((note) => note._id === active);
        allNotes.splice(index, 1);
        updateNotes([...allNotes]);
        toast.success('Deleted successfully!');
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      error.response?.errors?.forEach((error: CustomError) => {
        console.error(error.message);
      });
    }
  };

  return (
    <div className="flex">
      <Sidebar
        deleteNote={deleteNote}
        notes={notes}
        createNewNote={createNewNote}
        setIsActive={setActiveState}
        name={data?.user?.name || 'Just you'}
      />
      {isCreating && (
        <Editor
          title={title}
          setTitle={updateTitle}
          body={body}
          updateNote={updateNote}
          setBody={updateBody}
        />
      )}
      {!isCreating && (
        <div className="fixed w-3/4 h-screen text-center right-0 text-xl top-1/2 text-white">
          Start creating notes by adding one on the left!
        </div>
      )}
      <button
        className="fixed bg-rose-500 w-1/4 h-fit px-3 py-1.5 text-slate-100 bottom-0"
        onClick={() => signOut()}
      >
        Sign Out
      </button>
    </div>
  );
};

export default DiaryPage;
