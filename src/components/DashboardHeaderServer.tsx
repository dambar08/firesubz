import { auth } from "@/server/auth";
import DashboardHeader from "./DashboardHeader";

const DashboardHeaderServer = async () => {
  const session = await auth();
  const email = session?.user?.email ?? "user@example.com";

  return <DashboardHeader userEmail={email} />;
};

export default DashboardHeaderServer;