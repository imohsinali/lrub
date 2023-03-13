import { useRouter } from 'next/router';
import { useEffect } from 'react';

const ProtectedRoute = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("Adminlogin");
console.log("aasas", isAuthenticated);
    if (!isAuthenticated) {
      router.push('/');
    }
  }, []);

  return children;
};

export default ProtectedRoute;
