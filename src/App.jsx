import { useState, useCallback, useEffect, useRef } from "react";
function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  // useRef
  const passRef = useRef();
  // useCallback
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!`@#$%^&*_-+,./";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  // useEffect
  const copyPasswordToClipboard = useCallback(() => {
    passRef.current?.select();
    // passRef.current?.setSelectionRange(0, 6);
    window.navigator.clipboard.writeText(password);
  }, [password]);
  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <>
      <div className="w-full max-w-lg mx-auto shadow-md rounded-lg px-4 py-6 my-16 text-orange-500 bg-gray-700">
        <h2 className="text-white text-center text-3xl mb-2">
          Password Generator
        </h2>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-3 px-3"
            placeholder="Password"
            readOnly
            ref={passRef}
          />
          <button
            onClick={copyPasswordToClipboard}
            className="bg-blue-700 text-white outline-none px-3 py-0.5 shrink-0"
          >
            Copy
          </button>
        </div>
        <div className="flex text-base gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={30}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1 ml-7">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label>Numbers</label>
          </div>
          <div className=" flex items-center gap-x-1 ml-7">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="numberInput"
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label>Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
