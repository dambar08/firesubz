import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import Sidebar from "@/components/Sidebar";

export default async function DashboardLayoutServer({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) {
    redirect("/");
  }
  return <div className="flex">
    <Sidebar />
    <main className="flex-1">{children}</main>
  </div>;
}