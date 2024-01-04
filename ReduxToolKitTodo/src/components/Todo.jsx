import React from 'react'
import { useSelector } from 'react-redux'

const todo = useSelector((state) => state.todo);

function Todo() {
    return (
        <>
            <h3>Todos</h3>
            {todo.map((item) => {
                return <li> {item.text}</li>
            })}
        </>
    )
}

export default Todo