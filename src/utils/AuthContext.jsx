import { Children, createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext({
  isAuthenticated: false,
  jwtToken: null,
  login: () => {},
  logout: () => {},
  saveUsername: ()=>{},
  loginUsername:null
});

export const AuthProvider =({children})=>{
    const [isAuthenticated, setIsAuthenticated]=useState(false);
    const [jwtToken,setJwtToken]=useState(null);
    const [loginUsername,setLoginUsername]=useState(null);

    const saveUsername=(username)=>{
        setLoginUsername(username);
        localStorage.setItem('loginUsername',username);
    }

    const login=(token)=>{
        setIsAuthenticated(true);
        setJwtToken(token);
        localStorage.setItem('token',token);
    }

    const logout=()=>{
        setIsAuthenticated(false);
        setJwtToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('loginUsername');
    }

    useEffect(()=>{
        const token=localStorage.getItem('token');
        const user=localStorage.getItem('loginUsername');
        if(token){
            setIsAuthenticated(true);
            setJwtToken(token); 
            setLoginUsername(user);
        }
    },[jwtToken,loginUsername]);


    return(
        <AuthContext.Provider value={{isAuthenticated,jwtToken,login,logout,saveUsername,loginUsername}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth=()=>{
    return useContext(AuthContext);
}