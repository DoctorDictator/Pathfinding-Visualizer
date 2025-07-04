// WrapperContext.js
import { createContext, useState } from "react";

// Create the context
export const WrapperContext = createContext();

// Create a provider component
export const Wrapper = ({ children }) => {
  const [weightedNode, setWeightedNode] = useState(0);

  const addWeightedNode = () => {
    setWeightedNode((cur) => cur + 1);
  };

  return (
    <WrapperContext.Provider
      value={{
        weightedNode,
        addWeightedNode,
      }}
    >
      {children}
    </WrapperContext.Provider>
  );
};
