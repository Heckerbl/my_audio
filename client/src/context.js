import React, { createContext, useState } from "react";
export const ContexStore = createContext();

const Context = (props) => {
  const [data, setData] = useState();
  const [playMusic, setPlayMusic] = useState(false);

  return (
    <>
      <ContexStore.Provider value={{ data: [data, setData], musicStatus: [playMusic, setPlayMusic] }}>
        {props.children}
      </ContexStore.Provider>
    </>
  );
};

export default Context;
