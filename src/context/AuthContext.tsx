import React, {createContext, useEffect, useState} from 'react'
import {useCookies} from 'react-cookie'

interface UserInfo {
  username: string;
  verified: boolean;
  role: 'ADMIN' | 'BASIC';
}

interface LoginCredentials {
  email: string;
  password: string;
}


export interface IUseAuth {
  login: (data: LoginCredentials) => Promise<{success: boolean, message: string}>;
  logout: () => void;
  setUser: (user: UserInfo) => void;
  user?: UserInfo;
  isLoggedIn: boolean;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthContext = createContext<IUseAuth | undefined>(undefined)

export const AuthProvider = ({children}: AuthProviderProps) => {
  const [user, setUser] = useState<UserInfo | undefined>()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [cookies, setCookie, deleteCookie] = useCookies(['suka_nyabun'])

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_REST_SERVICE_BASE_URL}/auth/user`, {
          headers: {
            'Authorization': `Bearer ${cookies.suka_nyabun}`,
          },
          credentials: 'include',
        })
        const responseData = await response.json()

        if (!response.ok) {
          deleteCookie('suka_nyabun')
          setIsLoggedIn(false)
          setUser(undefined)
        }

        setIsLoggedIn(true)
        setUser({
          username: responseData.data.username,
          role: responseData.data.role,
          verified: responseData.data.verified,
        })
      } catch (e) {
        console.log(e)
      }
    }
    getUserInfo()
  }, [])

  const login = async (data: LoginCredentials) => {
    const response = await fetch(`${import.meta.env.VITE_REST_SERVICE_BASE_URL}/auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    const responseData = await response.json()

    if (!response.ok) {
      return {
        success: false,
        message: responseData.message,
      }
    }

    setCookie('suka_nyabun', responseData.data.accessToken, {path: '/'})
    setIsLoggedIn(true)
    setUser({
      username: responseData.data.username,
      role: responseData.data.role,
      verified: responseData.data.verified,
    })

    return {
      success: true,
      message: responseData.message,
    }
  }

  const logout = () => {
    setIsLoggedIn(false)
    setUser(undefined)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        login,
        logout,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
