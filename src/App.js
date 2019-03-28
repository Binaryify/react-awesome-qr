import React, { useState } from "react";
import ReactQr from "./qr";

function App() {
  const [state, setState] = useState(0);
  return (
    <div>
      <ReactQr
        bgSrc={require("./assets/bg1.png")}
        text="test test test" 
        size={300}
        dotScale={0.4}
        callback={testCallback}
      />
      <ReactQr
        bgSrc={require("./assets/bg1.png")}
        logoSrc={require("./assets/avatar.png")}
        text="test test test" 
        size={300}
        margin={0}
        dotScale={0.4}
      />
      <button onClick={e => setState(state + 1)} >change</button>
      <ReactQr text={state + ""} />
      <ReactQr
        gifBgSrc={require("./assets/dog.gif")}
        text="test test test" 
        size={300}
        dotScale={0.4}
      />
    </div>
  );
}
function testCallback(url,id){
  console.log(url,id)
}
export default App;
