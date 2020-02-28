import { useEffect, useState } from 'react';
import { useAuth0 } from './react-auth0-spa';

export const useGetToken = () => {
  const [token, setToken] = useState(null);
  const { isAuthenticated, getIdTokenClaims } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      const fetchToken = async () => {
        const result = await getIdTokenClaims();
        setToken(result.__raw);
      };
      fetchToken();
    } else {
      setToken(null);
    }
  }, [isAuthenticated, getIdTokenClaims]);

  return [token];
};
