import { useRouter } from "next/router";
import { useContext } from "react";
import { Context } from "@/components/context/context";

export const withAuth = (Component) => {
  const AuthRoute = (props) => {
    const { login } = useContext(Context);
    const router = useRouter();
    
    // If the user is not authenticated, redirect to login page
    if (!login.Admin) {
      router.push("/");
      return null;
    }

    // If the user is authenticated, render the component
    return <Component {...props} />;
  };

  return AuthRoute;
};
