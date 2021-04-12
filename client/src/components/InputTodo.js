import React, { Fragment, useState } from 'react'

function InputTodo() {

    const [description, setDescription] = useState("");

    const onFormSubmit = async(e) => {
        e.preventDefault();
        try {
            const body = { description };
            const response = await fetch("http://localhost:3001/todos", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(body)
            });

            console.log(response);
            window.location = "/";
        } catch (err) {
            console.error(err.message)
        }
    }
    return (
        <Fragment>
            <h1 className="text-center mt-5">Todo List</h1>
            <form className="d-flex mt-5" onSubmit={onFormSubmit}>
                <input 
                    type="text" 
                    className="form-control" 
                    onChange={e => setDescription(e.target.value)}
                />
                <button className="btn btn-success">Add</button>
            </form>
        </Fragment>
    )
}

export default InputTodo
