
import { AdminRoute } from "@/components/auth/AdminRoute";
import { AdminContent } from "@/components/admin/AdminContent";

const Admin = () => {
  return (
    <AdminRoute>
      <AdminContent />
    </AdminRoute>
  );
};

export default Admin;
