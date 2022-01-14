import React from 'react';
import ReactMarkdown from 'react-markdown';
import MarkdownComponents from './markdownComponents';

interface EditorProps {
  body: string;
  setBody: (value: string) => void;
}

const Editor: React.FC<EditorProps> = ({ body, setBody }) => {
  return (
    <div className="fixed w-3/4 h-screen right-0 flex flex-col p-1">
      <textarea
        className="outline-none p-3"
        value={body}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          setBody(e.target.value)
        }
        cols={30}
        rows={10}
      />
      <ReactMarkdown
        components={MarkdownComponents}
        className="w-full h-full p-1 bg-slate-50 mt-2 mb-8"
      >
        {body}
      </ReactMarkdown>
    </div>
  );
};

export default Editor;
