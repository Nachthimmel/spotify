import { useEffect } from 'react';
import axios from 'axios';
import { useData } from './Data';

const useAuth = (code) => {
  const [{ token }, dispatch] = useData();

  useEffect(() => {
    axios
      .post('http://localhost:5000/login', code)
      .then((res) => {
        dispatch({
          type: 'SET_TOKEN',
          token: {
            access_token: res.data.access_token,
            expires_in: res.data.expires_in,
            refresh_token: res.data.refresh_token,
            token_type: res.data.token_type,
          },
        });
        window.history.pushState({}, null, '/');
      })
      .catch(() => {
        window.location = '/';
      });
  }, [code]);

  //   useEffect(() => {
  //     if (!token.refresh_token || !token.expires_in) return;
  //     const interval = setInterval(() => {
  //       axios
  //         .post('http://localhost:5000/refresh', { token.refresh_token })
  //         .then((res) => {
  //           setAccessToken(res.data.accessToken);
  //           setExpiresIn(res.data.expiresIn);
  //         })
  //         .catch(() => {
  //           window.location = '/';
  //         });
  //     }, (expiresIn - 60) * 1000);

  //     return () => clearInterval(interval);
  //   }, [token.refresh_token, token.expires_in]);
};

export default useAuth;
