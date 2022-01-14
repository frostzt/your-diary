import { NextPage } from 'next';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const Index: NextPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/diary');
    }
  }, [status, router]);

  return (
    <div className="h-full">
      <div className="mt-80 text-center">
        <h1 className="font-black text-9xl text-slate-100">Your Diary</h1>
        <p className="text-slate-100 font-normal text-lg">
          A keeper of your personal thoughts.
        </p>
        {!session && (
          <button
            className="text-rose-500 w-fit h-fit px-3 py-1.5 bg-slate-100 rounded mt-3"
            onClick={() => signIn()}
          >
            Sign In
          </button>
        )}
      </div>
    </div>
  );
};

export default Index;
