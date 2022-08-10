import React,{useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

function FormAddProduct() {
    const [name,setName] = useState('');
    const [price,setPrice] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    const saveProduct = async(e) =>{
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/products',{
                name: name,
                price:price
            });
            navigate("/products");
        } catch (error) {
            setMsg(error.response.data.msg);            
        }
       
    }

  return (
    <div>
         <h1 className='title'>Product</h1>
        <h2 className="subtitle">Add New Product</h2>
        <div className="card is-shadowless">
            <div className="card-content">
                <div className="content">
                    <form onSubmit={saveProduct}>
                    <p className='has-text-centered'>{msg}</p>
                    <div className="field mt-5">
                            <label className="label">name</label>
                            <div className="controls">
                                <input 
                                value={name}
                                onChange={(e)=>setName(e.target.value)}
                                type="text" 
                                className="input" 
                                placeholder='name product'
                                />
                            </div>
                        </div>
                        <div className="field mt-5">
                            <label className="label">price</label>
                            <div className="controls">
                                <input
                                value={price}
                                onChange={(e)=>setPrice(e.target.value)} 
                                type="text" 
                                className="input" 
                                placeholder='Price'
                                />
                            </div>
                        </div>
                        <div className="field mt-5">
                            <button type="submit" className='button is-success'>Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default FormAddProduct