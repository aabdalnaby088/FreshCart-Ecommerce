import { jwtDecode } from "jwt-decode";
import { createContext , useEffect, useState } from "react";


export let TokenContext =  createContext(); 

export function TokenContextProvider({children})
{
    let [userToken , setuserToken] = useState(null); 

let [userData , setUserData] = useState({});



useEffect(()=>
{
if (userToken != null)
{
let data = jwtDecode(userToken) ; 
setUserData(data);
}


}, [userToken]
)

    return (
        <TokenContext.Provider value={{ userToken, setuserToken, userData }  }>
{children}
</TokenContext.Provider>
    )
}

