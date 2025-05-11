import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import SessionWrapper from '../../components/SessionWrapper';
import CampaignList from './CampaignList'; // 👈 client component

export default async function CampaignPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/');

  return (
    <SessionWrapper>
      <div className="container py-5">
        <h2 className="mb-4">📊 Campaign History</h2>
        <CampaignList />
      </div>
    </SessionWrapper>
  );
}
