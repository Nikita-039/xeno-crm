'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import SessionWrapper from '../components/SessionWrapper';
import Link from 'next/link';
import MessageGenerator from '../components/MessageGenerator'; // ✅ Import added

export default function Home() {
  return (
    <SessionWrapper>
      <HomeContent />
    </SessionWrapper>
  );
}

function HomeContent() {
  const { data: session } = useSession();

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card shadow p-4 w-100" style={{ maxWidth: '600px' }}>
        <h2 className="text-center mb-3">🚀 Xeno CRM</h2>

        {session ? (
          <>
            <p className="text-center">Welcome, {session.user.name}</p>
            <div className="d-flex flex-column gap-2 mt-3">
              <Link href="/segments/new" className="btn btn-success">
                + Create Segment
              </Link>
              <Link href="/campaigns" className="btn btn-outline-dark">
                View Campaign History
              </Link>
              <button className="btn btn-danger" onClick={() => signOut()}>
                Sign Out
              </button>
            </div>

            {/* ✅ AI Message Generator Added Below */}
            <MessageGenerator />
          </>
        ) : (
          <>
            <p className="text-center text-muted mb-3">
              Smart Segmentation & Campaign Delivery Platform
            </p>
            <button className="btn btn-primary w-100" onClick={() => signIn('google')}>
              Sign in with Google
            </button>
          </>
        )}
      </div>
    </div>
  );
}



