import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Loading from '@/components/loading';

interface Props {
  children: ReactNode;
};

const IsAuth: React.FC<Props> = ({ children }) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const token = localStorage.getItem('token');

        if (token) {
          setIsAuthenticated(true);
          setTimeout(() => {
            router.push('/');
          }, 1000);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkAuthentication();
  }, []);

  if (isAuthenticated === null) {
    return <Loading />;
  }

  return !isAuthenticated ? <>{children}</> : <Loading />;
};

export default IsAuth;
