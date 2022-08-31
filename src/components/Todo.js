import React, { useState, useEffect } from 'react'
import "../App.css"
import { toast } from 'react-toastify';


// to get the data from localStorage
const getLocalItems = () => {
    let lists = localStorage.getItem('lists');
    if (lists) {
        return JSON.parse(localStorage.getItem('lists'))
    } else {
        return []
    }

}
const Todo = () => {
    const [inputData, setInputData] = useState('');
    const [items, setItems] = useState(getLocalItems())
    const [toggleSubmit, setToggleSubmit] = useState(true);
    const [isEditItems, setIsEditItems] = useState(null)


    const addItem = () => {
        if (!inputData) {
            alert("Empty data")
            toast.warn("Empty data", {
                position: "top-center"
            });
        } else if (inputData && !toggleSubmit) {
            setItems(
                items.map((elem) => {
                    if (elem.id === isEditItems) {
                        return { ...elem, name: inputData }
                    }
                    return elem;
                })
            )
            setToggleSubmit(true)
            setInputData('')
            setIsEditItems(null)
        }
        else {
            const allInputData = { id: new Date().getTime().toString(), name: inputData }
            // setItems([...items, inputData]);
            setItems([...items, allInputData]);
            setInputData('')
        }

    }
    //delte items
    const deleteItem = (index) => {
        const updatedItems = items.filter((elem) => {
            return index !== elem.id;
        })
        setItems(updatedItems)
    }
    // remove itemss
    const removeAll = () => {
        setItems([]);
    }

    // Edit Items
    const editItem = (id) => {
        let newEditItems = items.find((elem) => {
            return elem.id === id;
        })
        setToggleSubmit(false)
        setInputData(newEditItems.name)
        setIsEditItems(id)

    }

    //adding data to localStorage
    useEffect(() => {
        localStorage.setItem('lists', (JSON.stringify(items)))
    }, [items])


    return (
        <>
            <div className="main-div">
                <div className="child-div">
                    <figure>
                        <img src="images/todo.svg" alt="" />
                        <figcaption>Add Your List here</figcaption>
                    </figure>
                    <div className="addItems">
                        <input type="text" placeholder='Add Items..'
                            value={inputData}
                            onChange={(e) => { setInputData(e.target.value) }}
                        />
                        {
                            toggleSubmit ? <i className="fa fa-plus add-btn" title='Add Item' onClick={addItem}></i> : <i className="far fa-edit add-btn" title='Update Item' onClick={addItem}></i>

                        }

                    </div>

                    <div className="showItems">
                        {
                            items.map((elem) => {
                                return (
                                    <div className="eachItem" key={elem.id}>
                                        <h3>{elem.name}</h3>
                                        <div className="todo-btn">
                                            <i className="far fa-edit add-btn" title='Edit Item' onClick={() => editItem(elem.id)}></i>
                                            <i className="far fa-trash-alt add-btn" title='Delete Item' onClick={() => deleteItem(elem.id)}></i>
                                        </div>

                                    </div>
                                )
                            })
                        }

                    </div>

                    {/* clear button */}
                    <div className="showItems">
                        <button className='btn effect04' data-sm-link-text="Remove All" onClick={removeAll}><span>
                            Check List</span></button>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Todo