import React,{useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'


function FormAddUsers() {
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [confpassword,setConfPassword] = useState('');
    const [role, setRole] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    const saveUser = async(e) =>{
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/users',{
                name: name,
                email:email,
                password: password,
                confPassword: confpassword,
                role:role
            });
            navigate("/users");
        } catch (error) {
            setMsg(error.response.data.msg);            
        }
       
    }
  return (
    <div>
        <h1 className='title'>Users</h1>
        <h2 className="subtitle">Add New Users</h2>
        <div className="card is-shadowless">
            <div className="card-content">
                <div className="content">
                    <form onSubmit={saveUser}>
                    <p className='has-text-centered'>{msg}</p>
                    <div className="field mt-5">
                            <label className="label">name</label>
                            <div className="controls">
                                <input value={name} onChange={(e)=>setName(e.target.value)} type="text" className="input" placeholder='name'/>
                            </div>
                        </div>
                        <div className="field mt-5">
                            <label className="label">Email</label>
                            <div className="controls">
                                <input value={email} onChange={(e)=>setEmail(e.target.value)} type="text" className="input" placeholder='email or username'/>
                            </div>
                        </div>
                        <div className="field mt-5">
                            <label className="label">password</label>
                            <div className="controls">
                                <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" className="input" placeholder='******'/>
                            </div>
                        </div>
                        <div className="field mt-5">
                            <label className="label">confirm password</label>
                            <div className="controls">
                                <input value={confpassword} onChange={(e)=>setConfPassword(e.target.value)} type="password" className="input" placeholder='******'/>
                            </div>
                        </div>
                        <div className="field mt-5">
                            <label className="label">Role</label>
                            <div className="controls">
                                <div className="select is-fullwidth">
                                    <select value={role} onChange={(e)=>setRole(e.target.value)}>
                                        <option value="admin">admin</option>
                                        <option value="user">user</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="field mt-5">
                            <button type='submit' className='button is-success'>Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default FormAddUsers