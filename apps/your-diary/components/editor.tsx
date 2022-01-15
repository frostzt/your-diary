import React from 'react';
import ReactMarkdown from 'react-markdown';
import MarkdownComponents from './markdownComponents';

interface EditorProps {
  body: string;
  title: string;
  updateNote: () => void;
  setBody: (value: string) => void;
  setTitle: (value: string) => void;
}

const Editor: React.FC<EditorProps> = ({
  body,
  setBody,
  title,
  setTitle,
  updateNote,
}) => {
  return (
    <div className="fixed w-3/4 h-screen right-0 flex flex-col p-1">
      <input
        value={title}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setTitle(e.target.value)
        }
        type="text"
        className="h-12 mb-2 w-full outline-none px-3"
      />
      <textarea
        className="outline-none p-3"
        value={body}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          setBody(e.target.value)
        }
        placeholder="Write your note here, you can use Markdown! Then view your result down below!"
        cols={30}
        rows={10}
      />
      <ReactMarkdown
        components={MarkdownComponents}
        className="w-full h-full p-1 bg-slate-50 mt-2"
      >
        {body}
      </ReactMarkdown>
      <button className="mt-2 text-white" onClick={updateNote}>
        Update note!
      </button>
    </div>
  );
};

export default Editor;
