import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import DashboardHeaderServer from "@/components/DashboardHeaderServer";

export default async function DashboardLayoutServer({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) {
    redirect("/");
  }
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 flex flex-col">
        <DashboardHeaderServer/>
        <div className="flex-1 overflow-auto ">{children}</div>
      </main>
    </div>
  );
}