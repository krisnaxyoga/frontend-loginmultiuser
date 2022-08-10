import React,{useEffect} from 'react';
import Layout from './Layout';
import FormAddUsers from '../components/FormAddUsers';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../features/authSlice';

const AddUser = () => {
    const dispacth = useDispatch();
    const navigate = useNavigate();
    const {isError,user} = useSelector((state)=>state.auth);
  
    useEffect(()=>{
      dispacth(getMe());
    },[dispacth]);
  
    useEffect(()=>{
        if(user && user.role !== "admin"){
            navigate("/dashboard");
          }
        },[isError,user,navigate]);
  return (
    <Layout>
        <FormAddUsers/>
    </Layout>
  )
}

export default AddUser