import React,{useState, useEffect} from 'react';
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';

function FormEditProduct() {
    const [name,setName] = useState('');
    const [price,setPrice] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate(); 
    const {id} = useParams();

    useEffect(() =>{
       const getProductById = async()=>{
        try {
            const response = await axios.get(`http://localhost:5000/products/${id}`);
            setName(response.data.name);
            setPrice(response.data.price);
            setMsg(response.data.msg);
        } catch (error) {
            if(error.response){
                setMsg(error.response.data.msg);    
            }
        }
       };
       getProductById()
    },[id]);

    const updateProduct = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`http://localhost:5000/products/${id}`,{
                name:name,
                price:price
            });
            navigate("/products");
        } catch (error) {
            setMsg(error.response.data.msg);  
        }
    };
  return (
    <div>
         <h1 className='title'>Product</h1>
        <h2 className="subtitle">Edit Product</h2>
        <div className="card is-shadowless">
            <div className="card-content">
                <div className="content">
                    <form onSubmit={updateProduct}>
                    <p className='has-text-centered'>{msg}</p>
                    <div className="field mt-5">
                            <label className="label">name</label>
                            <div className="controls">
                                <input value={name} onChange={(e)=>setName(e.target.value)} type="text" className="input" placeholder='name product'/>
                            </div>
                        </div>
                        <div className="field mt-5">
                            <label className="label">price</label>
                            <div className="controls">
                                <input value={price} onChange={(e)=>setPrice(e.target.value)} type="text" className="input" placeholder='Price'/>
                            </div>
                        </div>
                        <div className="field mt-5">
                            <button type='submit' className='button is-success'>Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default FormEditProduct