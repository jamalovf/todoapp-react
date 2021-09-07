import React, {useState} from 'react'
import "./todoapp.css"

function TodoApp() {

    const [task, setTask] = useState("")
    const [taskList, settaskList] = useState([])


    const handleChange = (e) => {
        setTask(e.target.value);
    }

    const AddTask = () => {
        if(task !== ""){
            const taskDetails = {
                id: Math.floor(Math.random() * 1000),
                value: task,
                isCompleted: false,
            };

        settaskList([...taskList, taskDetails]);
        }
    }

    const deleteTask = (e, id) => {
        e.preventDefault();
        settaskList(taskList.filter((t) => t.id !== id));
    }

    const taskCompleted = (e, id) => {
        e.preventDefault();
        //let's find index of element
        const element = taskList.findIndex(elem => elem.id === id);

        //copy array into new variable
        const newTaskList = [...taskList];

        //edit our element
        newTaskList[element] = {
            ...newTaskList[element],
            isCompleted: true,
        }

        settaskList(newTaskList); 
    }

    return (
        <div className="todo">
            <input 
                type="text" 
                name="text" 
                id="text" 
                onChange={(e) => handleChange(e)}
                placeholder="Add task here..."
            />
            <button
                className="add-btn"
                onClick={AddTask}  
            >Add
            </button>
            {
                taskList !== [] ?
                <ul>
                    {taskList.map(t => 
                        <li key={t.id} className={t.isCompleted ? "crossText" : "listitem"}>
                            {t.value}
                            <button className="delete" onClick={(e) => deleteTask(e, t.id)}>Delete</button>
                            <button className="completed" onClick={(e => taskCompleted(e, t.id))}>Completed</button>
                        </li>
                    )}
                </ul>
                : null
            }
        </div>
    )
}

export default TodoApp
