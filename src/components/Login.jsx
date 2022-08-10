import React, {useState,useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import {LoginUser,reset} from "../features/authSlice";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user,isError, isSuccess, isLoading, message } = useSelector(
        (state) => state.auth
    );
    useEffect(()=>{
        if(user || isSuccess){
            navigate("/dashboard");
        }
        dispatch(reset());
    },[user, isSuccess,dispatch,navigate]);

    const Auth = (e) =>{
        e.preventDefault();
        dispatch(LoginUser({email,password}));
    }
    
  return (
    <section className="hero has-background-grey-light is-fullheight is-fullwidth">
      <div className="hero-body">
        <div className="container">
         <div className="columns is-centered">
            <div className="column is-4-desktop">
                <form onSubmit={Auth} className="box">
                 {isError && <p className='has-text-centered'>{message}</p>}
                  <h1 className='title is-2'>Sig In</h1>
                    <div className="field mt-5">
                        <label className="label">Email</label>
                        <div className="controls">
                            <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" className="input" placeholder='email or username'/>
                        </div>
                    </div>
                    <div className="field mt-5">
                        <label className="label">password</label>
                        <div className="controls">
                            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="input" placeholder='******'/>
                        </div>
                    </div>
                    <div className="field mt-5">
                        <button type='submit' className='button is-success is-fullwidth'>
                            {isLoading ? 'Loading...' : 'Login'}
                            </button>
                    </div>
                </form>
            </div>
         </div>
        </div>
      </div>
    </section>
  )
}

export default Login