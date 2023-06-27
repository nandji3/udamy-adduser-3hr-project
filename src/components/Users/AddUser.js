import React, { useState } from "react";
import Card from "../UI/Card";
import Button from '../UI/Button';
import classes from './AddUser.module.css'
import ErrorModal from "../UI/ErrorModal";

const AddUser = (props) => {

    const [enteredUsername, setEnteredUsername] = useState('');
    const [enteredAge, setEnteredAge] = useState('');
    const [error, setError] = useState();    //or useState(true)

    const addUserHandler = (e) => {
        e.preventDefault();

        if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {

            setError({
                title: 'Invalid input',
                message: 'Please enter a valid name and age (non-empty values).'
            });
            return;
        }
        if (+enteredAge < 1) {
            setError({
                title: 'Invalid age',
                message: 'Please enter a valid age (>0).'
            });
            return;
        }
        props.onAddUser(enteredUsername, enteredAge)

        setEnteredUsername('');
        setEnteredAge('');
    }

    const usernameChangeHandler = (e) => {
        setEnteredUsername(e.target.value);
    }

    const ageChangeHandler = (e) => {
        setEnteredAge(e.target.value);
    }

    const errorHandler = () => {
        setError(null);  //or setError(false)
    }

    return (
        <>
            {error && <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler} />}
            <Card className={classes.input}>
                <form onSubmit={addUserHandler}>
                    <label htmlFor="username">Username</label>
                    <input id="username" type="text" value={enteredUsername} onChange={usernameChangeHandler} />
                    <label htmlFor="age">Age (Years)</label>
                    <input id="age" value={enteredAge} type="number" onChange={ageChangeHandler} />
                    <Button type="submit">Add User</Button>
                </form>
            </Card>
        </>
    )
}
export default AddUser;






// state Lifting Up concept props send from child to parent using onAdduser props as callback function inside the AddUser components then and sent props from child componenet as a parameter inside the onAddCallback function