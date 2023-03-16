import { useEffect } from "react";
import { useRouter } from "next/router";

const ProtectedRoute = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const session = localStorage.getItem("session");

    if (session !== "token") {
      router.push("/");
    }
  }, [router]);

  return <>{children}</>;
};

export default ProtectedRoute;
