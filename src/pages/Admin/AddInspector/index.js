import { Button } from "@chakra-ui/react";
import Link from "next/link";
import ProtectedRoute from "../../../components/protected/withauth";

const AddInspector = () => {
  return <ProtectedRoute>
    <Button>Click me</Button>
  </ProtectedRoute>;
};

export default AddInspector;
