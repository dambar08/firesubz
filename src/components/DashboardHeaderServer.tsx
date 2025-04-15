import { auth } from "@/server/auth";
import DashboardHeader from "./DashboardHeader";

const DashboardHeaderServer = async () => {
  const session = await auth();
  const email = session?.user?.email ?? "user@example.com"; // Provide a default if email is not available

  return <DashboardHeader userEmail={email} />;
};

export default DashboardHeaderServer;