import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import useAuth from './useAuth';

const instance = axios.create({
  baseURL: 'http://localhost:5100/api',
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { user, userLogout } = useAuth();

  useEffect(() => {
    const requestInterceptor = instance.interceptors.request.use(config => {
      const token = user?.accessToken;
      if (token) {
        config.headers.authorization = `Bearer ${token}`;
      }
      return config;
    });

    instance.interceptors.response.use(res => {
      return res;
    }),
      error => {
        const status = error.status;
        if (status === 401 || status === 403) {
          userLogout().then(() => {
            navigate('/');
          });
        }
      };

    return () => {
      instance.interceptors.request.eject(requestInterceptor);
      instance.interceptors.response.eject();
    };
  }, [user, userLogout, navigate]);

  return instance;
};

export default useAxiosSecure;
