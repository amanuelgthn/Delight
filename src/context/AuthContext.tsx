import { IContextType } from '@/types';
import { createContext, useContext, useEffect, useState } from 'react'


export const INITIAL_USER = {
    id: '',
    name: '',
    usernames: '',
    email: '',
    imageUrl: '',
    bio: '',
};

const INITIAL_STATE = {
    user: INITIAL_USER,
    isloading: false,
    isAuthenticated: false,
    setUser: () => {},
    setIsAuthenticated: () => {},
    checkAuthUser: async () => false as boolean,
}

const AuthContext = createContext<IContextType>(INITIAL_STATE);
const AuthContext = () => {
  return (
    <div>AuthContext</div>
  )
}

export default AuthContext