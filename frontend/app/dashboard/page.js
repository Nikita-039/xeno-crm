import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/");

  return (
    <div>
      <h1>Campaign Dashboard</h1>
      <p>Only visible to logged-in users.</p>
    </div>
  );
}
