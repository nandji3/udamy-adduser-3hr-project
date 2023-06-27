import React from "react";
import Card from '../UI/Card';
import classes from './UsersList.module.css';

const UserList = (props) => {
    console.log(props.users);

    return (
        <Card className={classes.users}>
            <ul>
                {props.users.map((user) => {
                    return (<li key={user.id}>
                        {user.name} ({user.age} year old.)
                    </li>)
                })}
            </ul>
        </Card>
    )
}
export default UserList;