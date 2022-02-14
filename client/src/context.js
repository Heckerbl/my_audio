import React, { createContext , useState } from "react";


export const ContextProvider = createContext();

const Context = (props) => {
    const [data, setdata] = useState({});

   return (<ContextProvider.Provider value={{all_data :[data , setdata]}}>
        {props.childern}
    </ContextProvider.Provider>
    )
}; 

export const data = {
    title: "Perfect | By ed sheeran and saroj collab  😘",
    author: "Saroj Regmi",
    downloads: "1K",
    likes: "10K"
}


export default Context;
