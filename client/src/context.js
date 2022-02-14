import React, { createContext, useState } from "react";
export const ContexStore = createContext();

const Context = (props) => {
    const array = [{
        name: "Rajesh"
    }]
    const secArray = [
        {
            surname: "Khadka"
        }
    ]
    const info = "Rajesh khadka";
    return (
        <>
            <ContexStore.Provider
                value={{ array, secArray }}
            >
                {props.children}
            </ContexStore.Provider>
        </>
    );
}




export const data = {
    title: "Perfect | By ed sheeran and saroj collab  😘",
    author: "Saroj Regmi",
    downloads: "1K",
    likes: "10K"
}
export default Context;