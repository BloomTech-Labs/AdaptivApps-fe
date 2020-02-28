import { useEffect, useState } from 'react';
import { useAuth0 } from './react-auth0-spa';

export const useGetToken = () => {
  const [token, setToken] = useState(null);
  const { isAuthenticated, getIdTokenClaims } = useAuth0();

  useEffect(() => {
    // console.log('OUR AUTH STATUS: ', isAuthenticated);
    if (isAuthenticated) {
      const fetchToken = async () => {
        const result = await getIdTokenClaims();
        // const otherToken = await getTokenSilently();
        // console.log('RESULT: ', result);
        // console.log(`THE "OTHER" TOKEN: `, otherToken);
        setToken(result.__raw);
      };
      fetchToken();
    } else {
      setToken(null);
    }
  }, [isAuthenticated]);

  return [token];
};
