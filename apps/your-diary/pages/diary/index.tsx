import { NextPage } from 'next';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Editor from '../../components/editor';
import Sidebar from '../../components/sidebar';

const DiaryPage: NextPage = () => {
  const router = useRouter();
  const { data, status } = useSession();
  const [body, setBody] = useState<string>('');
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/');
    }
  }, [status, router]);

  const updateBody = (value: string) => {
    setBody(value);
  };

  return (
    <div className="flex">
      <Sidebar name={data?.user?.name || 'Just you'} />
      {isCreating && <Editor body={body} setBody={updateBody} />}
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
