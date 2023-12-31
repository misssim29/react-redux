# React

## 리액트설치설명

### 리액트 설치

(node.js랑 npx 설치되어있어야함)

npx create-react-app 프로젝트이름
(vue에서 vue-cli 역할)

### 브라우저세팅

크롬 확장프로그램에서
React developer tools 라는 확장프로그램 받기

---

## 리액트 메모

### useState

```
import React, { useState } from 'react';
const [count, setCount] = useState(0);
```

useState를 쓸때는 위와같이 useState를 react에서 가져와야함

### Props

상위 컴포넌트에서 템플릿구문에 props를 내려줌.

```
<Counter initialValue={number} />
```

### children

컴포넌트를 children으로 아래와같이 템플릿안에 내용을 넣을때

```
//상위
<Container>
    <div className="App">
        <Counter {...counterProps} />
    </div>
</Container>
//껍데기 컴포넌트
const Container = ({children}) =>{
    return(
        <div style={{margin:20, padding:20, border:"1px solid #222"}}>
            {children}
        </div>
    )
}
export default Container
```

### useRef

포커스 기능 쓸때 사용

```
const contentInput = useRef();
contentInput.current.focus();
```

태그 속성으로

```
ref={contentInput}
```

### map()

가져온 배열을 map으로 하나씩 보여줌
vue에서 v-for=item in List와 같은 역할

```
{diaryList.map((it) =>(
    <div>
        <div>작성자 : {it.author}</div>
    </div>
))}
```

### 배열 못가져올때 디폴트값 설정하기

함수에 defaultProps 추가해서 설정해주기

```
DiaryList.defaultProps={
    diaryList : [],
}
```

### map쓸때 key값 설정

가장 상위 div에  
 key={it.id} 추가  
 id값이 배열중에 없다면 그냥 idx을 넣어도 무방

```
{diaryList.map((it) =>(
<div key={it.id}>
   <div>작성자 : {it.author}</div>
   <div>일기 : {it.content}</div>
   <div>감정 : {it.emotion}</div>
   <div>작성 시간(ms) : {it.create_date}</div>
</div>
))}
```

### useEffect

라이프사이클을 관리하는 기능  
컴포넌트가 MOUNT되었을때 주는 기능

```
const [count,setCount] = useState(0);
const [text,setText] = useState("");

//처음 mount시 (vue:mounted)
useEffect(()=>{
    console.log("Mount!");
},[]);

//업데이트시 (vue:updated)
useEffect(() =>{
    console.log("update");
});

(vue:watch)
//usestate가 변할때만 감지해서 작동시킬수 있음
useEffect(()=>{
    console.log(`count is update : ${count}`);
    if(count > 5){
        alert("count가 5를 넘었습니다 따라서 1로 초기화합니다.");
        setCount(1);
    }
},[count]);
//component가 사라질때(unmounted 역할)
useEffect(()=>{
    return () => console.log("unmounted");
},[])
```

### useMemo

연산최적화 역활, 어떤값이 변화할때만 함수를 작용하고싶을때 쓴다  
단, 주의할점은 useMemo를 쓸 경우 변수가 함수가 아니라 그대로 값을 return해서  
불러올때 func()가 아니라 func 자체로 가져와야한다.

```
const getDiaryAnalysis = useMemo(() =>{
    console.log("일기 분석 시작");
    const goodCount = data.filter((it)=>it.emotion>=3).length;
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length) * 100;
    return {goodCount,badCount,goodRatio};
},[data.length]);
const {goodCount, badCount, goodRatio} = getDiaryAnalysis;
```

### 함수형 컴포넌트에 업데이트 조건을 거는 방법(최적화)

React.memo(({text})=>{})  
를 통해서 text값이 바뀌면 리렌더링 하도록 설정

```
const Textview = React.memo(({text}) => {
    useEffect(()=>{
        console.log(`update :: Text : ${text}`);
    })
    return <div>{text}</div>;
});
const CountView = React.memo(({count}) => {
    useEffect(()=>{
        console.log(`update :: Count : ${count}`);
    })
    return <div>{count}</div>;
});
const OptimizeTest = () => {

    const [count,setCount] = useState(1);
    const [text,setText] = useState("");

    return(
        <div style={{padding:50}}>
            <div>
                <h2>count</h2>
                <CountView count={count} />
                <button onClick={()=>setCount(count+1)}>+</button>
            </div>
            <div>
                <h2>text</h2>
                <Textview text={text} />
                <input value={text} onChange={(e)=>setText(e.target.value)} />
            </div>
        </div>
    )
}
```

### React.memo(변수) 쓸 때 변수에 객체로 넣을 경우

obj가 단일 값이 아닌 객체로 이루어졌을 경우 안의 내용이 같아도 다르게 인식한다  
한마디로 객체형식으로 업데이트가 되지않아도 계속 리렌더링이 일어날 수 있다는 소리다  
그래서 아래와같이 prevProps === nextProps로 체크를 해주고 true와 false값으로 구분해서
React.memo(호출컴포넌트,구분함수) 이렇게 써줘야한다.

```
const [obj,setObj] = useState({
    count : 1
})
const CounterB = ({obj})=>{
    useEffect(()=>{
        console.log(`CounterB update - obj : ${obj}`);
    })
    return <div>{obj.count}</div>
};
const areEqual = (prevProps, nextProps)=>{
    if(prevProps.obj.count === nextProps.obj.count){
        return true;
    }
    return false;
}
const MemoizedCounterB = React.memo(CounterB,areEqual);
```

### useCallback()

메모이제이션된 콜백을 반환한다.

```
const onCreate = useCallback((author,content,emotion) => {
    const created_date = new Date().getTime();
    const newItem = {
        author,
        content,
        emotion,
        created_date,
        id:dataId.current,
    }
    dataId.current++;
    setData((data)=>[newItem,...data]);
    // setData로 기존의 data를 넘겨주기때문에 뒤에 []값을 비워서 렌더링을 막을수 있다.
},[]);
```

### useReducer

useState가 여러개 쓰일때 쓸 수 있는 상태관리 기능

```
const [data,dispatch] = useReducer(reducer,[]);
const reducer = (state,action) =>{
	switch(action.type){
		case 'INIT' :{
			return action.data;
		}
		case 'CREATE':
			const created_date = new Date().getTime();
			const newItem = {
				...action.data,
				created_date
			}
			return [newItem,...state];
		case 'REMOVE':
			return state.filter((it)=>it.id !== action.targetId);
		case 'EDIT':
			return state.map((it) => it.id === action.targetId ? {...it,content: action.newContent} : it);
		default:
			return state;
	}
}
	const onCreate = useCallback((author,content,emotion) => {
		dataId.current++;
		dispatch({type:'CREATE',data:{
			author,
			content,
			emotion,
			id:dataId.current,
		}});
	},[]);
	const onRemove = useCallback((targetId) => {
		dispatch({type:'REMOVE',data:targetId});
	},[]);
	const onEdit = useCallback((targetId,newContent) => {
		dispatch({type:'EDIT',targetId,newContent});
	},[]);
```

### createContext

```
export const DiaryStateContext = React.createContext();
	return (
		<DiaryStateContext.Provider value={data}>
		<div className="App">
			<DiaryEditor onCreate={onCreate} />
			<div>전체 일기 : {data.length}</div>
			<div>기분 좋은 일기 개수 : {goodCount}</div>
			<div>기분 나쁜 일기 개수 : {badCount}</div>
			<div>기분 좋은 일기 비율 : {goodRatio}</div>
			<DiaryList onRemove={onRemove} onEdit={onEdit} />
		</div>
		</DiaryStateContext.Provider>
	);
```

### useContext

전역 상태 관리
위와같은 createContext로 객체 생성 가장 상위에 provider로 감싸주기
위에서 value값으로 넣은 데이터를 useContext로 가져온다

```
const data = useContext(DiaryStateContext);
```

provider에서 아래와같이 하면 함수도 전역상태로 쓸 수 있다(dispatch역할)

```
<DiaryDispatchContext.Provider value={{
onCreate,
onEdit,
onRemove,
}}>
```

### router 설치하는법

npm i react-router-dom@6

### router 기본사용법

app에서 view로 아래와같이 넣어준다,

```
<Route path='/edit' element={<Edit />} />
```

컴포넌트에서 링크 부분은 아래와같이 넣어준다

```
import { Link } from 'react-router-dom';
<Link to={'/edit'}>Edit</Link>
```

### useParams 파라메터값 추출하는법

```
<Route path='/diary/:id' element={<Diary />} />
import { useParams } from "react-router-dom";
const {id} = useParams();
```

### query string 전달하는법

useSearchParams를 통해서 가져올 수 있다.
setSearchParams를 통해 쿼리를 변경시킬수도있다.

```
import { useSearchParams } from "react-router-dom";
const [searchParams, setSearchParams] = useSearchParams();
const id = searchParams.get('id');
<button onClick={()=>setSearchParams({who:"juyeon"})}>QS 바꾸기</button>
```

### js쪽에서 link를 바꾸고싶을때

useNavigate를 통해서 링크를 바꿔줄수있다.

```
const navigate = useNavigate();
const hoHome = () => {
    navigate("/home");
}
<button onClick={goHome}>
    홈으로가기
</button>
```

뒤로가기

```
navigate(-1);
```

### img태그 쓸때 경로 가져오기

process.env.PUBLIC_URL

```
<img src={process.env.PUBLIC_URL + `/assets/emotion1.png`} />
```

### 리액트로 html쪽에 class나 for 속성쓸때

class -> className
for -> htmlFor
로 바꿔줘야한다 jsx는 js기반이라 html을 제대로 인식하지 않을 수 있기때문에 DOM 문제가 생긴다.
이와같이 js의 기본옵션과 겹치는 html 속성은 따로 써줘야한다.

### 절대경로 설정

```
// jsconfig.json
{
  "compilerOptions": {
    "baseUrl": "src",
  }
}
```

### react - html안에 if문 쓰는 방법

{} 중괄호 안에 삼항연산자로 넣어준다.

```
ex: {idx > 0 ? idx : ''}
```

## 요약 vue - react 비교

```
ref() = useState()
mounted() = useEffect()
unmounted() = useEffect()에 return값으로 넘기기
ref = ref/useRef()
```

## Redux

### REDUX 설치

npm i @reduxjs/toolkit redux react-redux

### redux toolkit 사용법

useSelector와 useDispatch로 store을 사용할 수 있다.
store는 slice로 이루어져있으며 여러개의 slice를 name을 지정해 쓸 수 있다.

```
const Todos = createSlice({
    name: "todos",
    initialState: { list: [] },
    reducers: {
        addTodo: (state, action) => {
            state.list.push(action.todo);
        },
    },
});
const count = useSelector((state) => state.counter.value);
const dispatch = useDispatch();
```
