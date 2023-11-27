import './App.css';
import React,{useState} from 'react';
import axios from 'axios';


function App() {

  //버튼 카운트
  const [state,setState] = useState(0);

  const AddState = () => {
    if(state >= 10){
      setState(0);
    } else{
      setState(state+1);
    }
  }


  //초변환
  const [minute, setMinute] = useState('');
  const [second, setSecond ] = useState('');

  const onChangeMinute = (event) => {
    setMinute(event.target.value);
    setSecond(event.target.value * 60);
  };
  const onChangeSecond = (event) => {
    setMinute(Math.round(event.target.value/60));
    setSecond(event.target.value);
  }
  const onReset = () =>{
    setMinute('');
    setSecond('');
  }

  return (
    <div className="App" >
      {/* 버튼 카운트 */}
      <button onClick={AddState}>{state}</button>
      {state > 0 ? state : ''}
      <hr />
      {/* 초 변환 */}
      <div>
        <input type="number" id="minutebox" value={minute} onChange={onChangeMinute} placeholder='minute' />
        <label htmlFor='minutebox'>분</label>
        <input type="number" id="secondbox" value={second} onChange={onChangeSecond} placeholder='number' />
        <label htmlFor='secondbox'>초</label>
      </div>
      <button type="button" onClick={onReset}>Reset</button>
      <hr />
    </div>
  );
}

export default App;
