import { getServerSession } from 'next-auth';
import { authOptions } from '../../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import RuleBuilder from './RuleBuilder';
import SessionWrapper from '../../../components/SessionWrapper';


export default async function CreateSegmentPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/');

  return (
     <SessionWrapper>
    <div className="container py-5">
      <h2 className="mb-4">Create Audience Segment</h2>
      <RuleBuilder/>
    </div>
    </SessionWrapper>
  );
}
