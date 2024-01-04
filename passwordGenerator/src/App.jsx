import { useCallback, useEffect, useRef, useState } from 'react'

function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password);
  },[password]) 

  const passwordGenerator = useCallback(() => {
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let pass = "";

    if (numAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()-_=+[{]};:\,<.>/?";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char);
    }

    setPassword(pass);

  }, [length, charAllowed, numAllowed , setPassword])

  useEffect(()=>{
   passwordGenerator()
  },[numAllowed,charAllowed,length,passwordGenerator])

  return (
    <>
      <div className='w-full max-w-md mx-auto my-8 showdow-md text-orange-500 bg-gray-800 py-4 rounded-lg px-3'>
        <h1 className='text-white text-center mx-3 mb-4'>Password Generator</h1>
        <div className='flex items-center rounded-lg mb-3'>
        <input
          type="text"
          value={password}
          className='outline-none py-1 px-3  w-full rounded-s-lg'
          placeholder='password'
          ref={passwordRef}
          readOnly
        />
        <button className='bg-blue-700 py-1 px-3  text-white rounded-e-lg' onClick={copyPasswordToClipboard}>Copy</button>
        </div>
        

        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-2">
            <input
              type="range"
              min={6}
              max={40}
              value={length}
              onChange={(e) => { setLength(e.target.value) }}
              id="range_input"
            />
            <label htmlFor="range_input">length:{length}</label>
          </div>
          <div className="flex items-center gap-x-2">
            <input
              type="checkbox"
              defaultChecked={numAllowed}
              value={numAllowed}
              onChange={() => { setNumAllowed((prev) => !prev) }}
              id="num_allowed"
            />
            <label htmlFor="num_allowed">Numbers</label>
          </div>
          <div className="flex items-center gap-x-2">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              value={charAllowed}
              onChange={() => { setCharAllowed((prev) => !prev) }}
              id="char_allowed"
            />
            <label htmlFor="char_allowed">Charactors</label>
          </div>
        </div>

      </div>
    </>
  )
}

export default App
