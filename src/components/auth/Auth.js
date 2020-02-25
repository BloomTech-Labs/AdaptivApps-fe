import { useEffect, useState } from 'react';

//import from auth0
import { useAuth0 } from './react-auth0-spa';

export const useGetToken = () => {
  const [token, setToken] = useState(null);
  const { isAuthenticated, getIdTokenClaims} = useAuth0();

  useEffect(() => {

    //Checks to see if user is Authenticated with Auth0.

    if (isAuthenticated) {
      const fetchToken = async () => {

        //Result contains token and other info about the user
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
