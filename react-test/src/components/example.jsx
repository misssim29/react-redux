import { useState } from "react"

const Example = () => {


  const [OnState, SetState] = useState(true);
  const ifDiv = () =>{
    return <div>if</div>
  }
  const elseDiv = () =>{
    return <div>else</div>
  }
  return(
    <div className="wrap">
      {OnState ? ifDiv : elseDiv}
    </div>
  )
}
export default Example;