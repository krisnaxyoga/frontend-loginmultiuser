import React,{useEffect,useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

function UserList() {
    const [users,setUsers] = useState([]);

    useEffect(()=>{
        getUsers();
    },[]);

    const getUsers = async()=>{
        const response = await axios.get("http://localhost:5000/users");
        setUsers(response.data);
    }
    const deleteUser = async(UserId)=>{
        await axios.delete(`http://localhost:5000/users/${UserId}`);
        getUsers();
    }
  return (
    <div>
        <h1 className='title'>User List</h1>
        <h2 className="subtitle">List of users</h2>
        <Link to="/users/add" className="button is-primary mb-2">Add New</Link>
        <table className='table is-striped is-fullwidth'>
            <thead>
                <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user,index)=>(
                <tr key={user.uuid}>
                    <td>{index+1}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>
                        <Link to={`/users/edit/${user.uuid}`} className="button is-small is-info">Edit</Link>
                        <button onClick={()=>deleteUser((user.uuid))} className='button is-small is-danger'>Delete</button>
                    </td>
                </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default UserList