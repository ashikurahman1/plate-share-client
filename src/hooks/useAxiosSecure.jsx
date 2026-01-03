import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import useAuth from './useAuth';

const isLocal = 
  window.location.hostname === 'localhost' || 
  window.location.hostname === '127.0.0.1' || 
  window.location.hostname === '0.0.0.0' || 
  window.location.hostname.startsWith('192.168.') || 
  window.location.hostname.startsWith('10.');

const API_URL = isLocal 
  ? 'http://localhost:5100/api' 
  : 'https://plate-share-serv1.vercel.app/api';

const instance = axios.create({
  baseURL: API_URL,
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

    instance.interceptors.response.use(
      res => res,
      error => {
        const status = error.response?.status;
        if (status === 401 || status === 403) {
          userLogout().then(() => {
            navigate('/login');
          });
        }
        return Promise.reject(error);
      }
    );

    return () => {
      instance.interceptors.request.eject(requestInterceptor);
      instance.interceptors.response.eject();
    };
  }, [user, userLogout, navigate]);

  return instance;
};

export default useAxiosSecure;
