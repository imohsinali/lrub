// import { withAuth } from "@/components/protected/withauth";

import { Button } from "@chakra-ui/react";
import Link from "next/link";

import ProtectedRoute from "../../components/protected/withauth";

const index = () => {
  return <ProtectedRoute>
    <div>
      <h1>Admin Page</h1>

      <Link href="/Admin/AddInspector">AddInspector</Link>
    </div>
  </ProtectedRoute>;
};

export default index;