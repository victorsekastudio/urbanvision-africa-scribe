
import { AdminContent } from "@/components/admin/AdminContent";
import { Helmet } from "react-helmet-async";

// Add noindex/nofollow meta for admin security
const Admin = () => {
  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <AdminContent />
    </>
  );
};

export default Admin;
