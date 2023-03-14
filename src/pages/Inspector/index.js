import { useEffect } from 'react';
import { useRouter } from 'next/router';

const MyComponent = () => {
  const router = useRouter();
  const { pathname } = router;
  
  useEffect(() => {
    const handleRouteChange = (url) => {
      const protectedRoutes = ['/inspector', '/inspector/1', '/inspector/2']; // Add any protected routes here
      if (protectedRoutes.includes(url)) {
        router.push('/');
      }
    };
    
    router.events.on('beforeHistoryChange', handleRouteChange);
    
    return () => {
      router.events.off('beforeHistoryChange', handleRouteChange);
    };
  }, [router]);
  
  return (
    <h1>Hkkasjk</h1>
  );
};

export default MyComponent;
