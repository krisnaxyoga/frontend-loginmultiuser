import React,{useEffect} from 'react';
import Layout from './Layout';
import UserList from '../components/UserList';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../features/authSlice';

function Users() {
  const dispacth = useDispatch();
  const navigate = useNavigate();
  const {isError,user} = useSelector((state)=>state.auth);

  useEffect(()=>{
    dispacth(getMe());
  },[dispacth]);

  useEffect(()=>{
    if(isError){
      navigate("/");
    }
    if(user && user.role !== "admin"){
      navigate("/dashboard");
    }
  },[isError,user,navigate]);
  return (
    <Layout>
        <UserList/>
    </Layout>
  )
}

export default Users