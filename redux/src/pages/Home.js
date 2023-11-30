import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { asyncUpFetch } from "../store/store";

// redux 동기적
const Counter = () => {
    const count = useSelector((state) => state.counter.value);
    const dispatch = useDispatch();
    const addCount = () => {
        dispatch({ type: "counter/addCount", step: 2, step2: 5 });
        // dispatch(counterSlice.actions.addCount(2));
    };

    console.log(count);
    return (
        <div>
            <button onClick={addCount}>+</button> {count}
        </div>
    );
};

const TodoList = () => {
    const dispatch = useDispatch();
    const todolist = useSelector((state) => state.todos.list);
    const addTodo = () => {
        dispatch({ type: "todos/addTodo", todo: todoVal });
        setTodoVal("");
    };
    const [todoVal, setTodoVal] = useState("");
    const onChange = (e) => {
        setTodoVal(e.target.value);
    };
    return (
        <div>
            <input type="text" value={todoVal} onChange={onChange} />
            <button onClick={addTodo}>add</button>
            <ul>
                {todolist.map((todo) => (
                    <li key={todo}>{todo}</li>
                ))}
            </ul>
        </div>
    );
};

const AsyncAPI = () => {
    const dispatch = useDispatch();
    const asyncVal = useSelector((state) => state.comments.value);
    const asyncStatus = useSelector((state) => state.comments.status);
    const getApi = () => {
        dispatch(asyncUpFetch());
    };
    return (
        <div>
            <button onClick={getApi}>getAPI</button>
            <div>
                {asyncVal} | {asyncStatus}
            </div>
        </div>
    );
};

const Home = () => {
    return (
        <div>
            <Counter></Counter>
            <TodoList></TodoList>
            <AsyncAPI></AsyncAPI>
        </div>
    );
};

export default Home;
