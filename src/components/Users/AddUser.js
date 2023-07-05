import React, { useRef, useState } from "react";
import Card from "../UI/Card";
import Button from '../UI/Button';
import classes from './AddUser.module.css'
import ErrorModal from "../UI/ErrorModal";
import Wrapper from '../Helpers/Wrapper';

const AddUser = (props) => {

    const nameInputRef = useRef();
    const ageInputRef = useRef();
    const collegeName = useRef();

    const [error, setError] = useState();    //or useState(true)

    const addUserHandler = (e) => {
        e.preventDefault();
        const enteredName = nameInputRef.current.value;
        const enteredUserAge = ageInputRef.current.value;
        const enteredUsercollege = collegeName.current.value;

        if (enteredName.trim().length === 0 || enteredUserAge.trim().length === 0 || enteredUsercollege.trim().length === 0) {

            setError({
                title: 'Invalid input',
                message: 'Please enter a valid username, collegeName and age (non-empty values).'
            });
            return;
        }

        if (+enteredUserAge < 1) {
            setError({
                title: 'Invalid age',
                message: 'Please enter a valid age (>0).'
            });
            return;
        }
        props.onAddUser(enteredName, enteredUserAge, enteredUsercollege)

        nameInputRef.current.value = "";
        ageInputRef.current.value = "";
        collegeName.current.value = "";
    }

    const errorHandler = () => {
        setError(null);  //or setError(false)
    }

    return (
        <Wrapper>
            {error && <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler} />}
            <Card className={classes.input}>
                <form onSubmit={addUserHandler}>
                    <label htmlFor="username">Username</label>
                    <input id="username" type="text" ref={nameInputRef} />
                    <label htmlFor="age">Age (Years)</label>
                    <input id="age" type="number" ref={ageInputRef} />
                    <label htmlFor="college">College Name</label>
                    <input id="college" type="text" ref={collegeName} />
                    <Button type="submit">Add User</Button>
                </form>
            </Card>
        </Wrapper>
    )
}
export default AddUser;

// state Lifting Up concept props send from child to parent using onAdduser props as callback function inside the AddUser components then and sent props from child componenet as a parameter inside the onAddCallback function