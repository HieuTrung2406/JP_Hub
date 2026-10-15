import { useState } from "react";
import TestAnt from "./TestAnt";
import ListJP from "./ListJP";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <TestAnt />
      <ListJP />
    </>
  );
}

export default App;
