import { getServerSession } from 'next-auth';
import { authOptions } from '../../../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import SessionWrapper from '../../../../components/SessionWrapper';
import CampaignLogTable from './CampaignLogTable';

export default async function CampaignLogPage({ params }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/');

  return (
    <SessionWrapper>
      <div className="container py-5">
        <h2 className="mb-4">📦 Campaign Delivery Logs</h2>
        <CampaignLogTable campaignId={params?.id} />

      </div>
    </SessionWrapper>
  );
}
