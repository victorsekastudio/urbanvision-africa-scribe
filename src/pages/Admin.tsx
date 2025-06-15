
// No need to gate here: SubdomainGuard in App.tsx enforces access + redirect
import { AdminContent } from "@/components/admin/AdminContent";

const Admin = () => {
  return <AdminContent />;
};

export default Admin;
