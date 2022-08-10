import React,{useEffect} from 'react'
import Layout from './Layout'
import FormEditUsers from '../components/FormEditUsers'
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../features/authSlice';

const EditUser = () => {
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
        <FormEditUsers/>
    </Layout>
  )
}

export default EditUser