import { useRef } from "react";
import { useEffect } from "react";
import { useState,useCallback } from "react"

function App() {
const[length,setlength]=useState(8);
const[isnumberallowed,setisnumberallowed]=useState(false);
const[ischaracterallowed,setischaracterallowed]=useState(false);
const [password, setpassword] = useState("password");
let passwordgenerator=useCallback(
  () => {
   let pass="";
   let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
   if(isnumberallowed==true)
    {
      str+="1234567890";
    }
    if(ischaracterallowed==true)
      {
        str+="!@#$%^&*(){}[]<>";
      }
      for(let i=1;i<=length;i++)
        {
                let index=Math.floor(Math.random()*(str.length)+1);
                pass+=str.charAt(index);
        }
        setpassword(pass);
  },
  [length,isnumberallowed,ischaracterallowed,setpassword],
)
const passref = useRef(null);
let copy=useCallback(
  () => {
  passref.current?.select();
    window.navigator.clipboard.writeText(password);
  },
  [password],
)

useEffect(() => {
  passwordgenerator();
}, [length,isnumberallowed,ischaracterallowed])

return (
    <>
     <div className="container bg-orange-300 h-96 w-1/2 relative top-52 left-96 rounded-xl ">
      <h1 className="text-black text-center relative top-[25%] font-bold text-2xl ">PASSWORD GENERATOR</h1>
   <div className="b1 flex justify-center items-center relative top-[30%] ">
    <input type="text" value={password} ref={passref} placeholder="your password" className="w-3/4 p-3 rounded-xl" />
    <button className="bg-black text-white rounded-xl  p-3" onClick={copy}>Copy</button>
   </div>
   <div className="b2 flex justify-center items-center relative top-[40%] gap-10 left-[-2%]">
    <input type="range" min={6} max={100} value={length} onChange={(e)=>{setlength(e.target.value)}} />
    <label>Length ({length})</label>
    <input type="checkbox"  defaultChecked={isnumberallowed} onChange={()=>{setisnumberallowed((prev)=>!prev)}}/>
    <label >Number</label>
    <input type="checkbox"  defaultChecked={ischaracterallowed} onChange={()=>{setischaracterallowed((prev)=>!prev)}}/>
    <label >Character</label>
   </div>
     </div>
    </>
  )
}

export default App
