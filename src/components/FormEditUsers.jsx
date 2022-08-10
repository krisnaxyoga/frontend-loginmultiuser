import React,{useState, useEffect} from 'react';
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';

function FormEditUsers() {
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [confpassword,setConfPassword] = useState('');
    const [role, setRole] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() =>{
        const getUserById = async()=>{
         try {
             const response = await axios.get(`http://localhost:5000/users/${id}`);
             setName(response.data.name);
             setEmail(response.data.email);
             setRole(response.data.role);
             setMsg(response.data.msg);
         } catch (error) {
             if(error.response){
                 setMsg(error.response.data.msg);    
             }
         }
        };
        getUserById()
     },[id]);
 
     const updateUser = async (e) => {
         e.preventDefault();
         try {
             await axios.patch(`http://localhost:5000/users/${id}`,{
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
     };
  return (
    <div>
        <h1 className='title'>Users</h1>
        <h2 className="subtitle">Update Users</h2>
        <div className="card is-shadowless">
            <div className="card-content">
                <div className="content">
                    <form onSubmit={updateUser}>
                    <p className='has-text-centered'></p>
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
                            <button type='submit' className='button is-success'>update</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default FormEditUsers