import React,{useState,useEffect,createContext} from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/config';


export const AuthContext = createContext(null)
export function AuthProvider({children}){
    const [user,setUser] = useState(null)


useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth,(currentUser) =>{
        setUser(currentUser)
    })

    return () =>unsubscribe()
},[])

return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
