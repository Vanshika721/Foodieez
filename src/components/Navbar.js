import React,{useState}from 'react'
import { Link,useNavigate } from 'react-router-dom'
import Badge from 'react-bootstrap/Badge'
import Modal from '../Modal';
import Cart from '../screens/Cart';
import { useCart } from './ContextReducer';


export default function Navbar() {
    let data=useCart();
    const [cartView, setcartView] = useState(false);
    const navigate=useNavigate();
    const handleLogout=()=>{
        localStorage.removeItem("authToken");
        navigate("/login")
    }

    return (
        <>
            <div>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark position-sticky">
                    <Link className="navbar-brand fs-1 fst-italic" to="/">Foodieez</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2">
                        <li className='nav-item'>
                            <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
                        </li>
                        {(localStorage.getItem("authToken"))?
                            <li className='nav-item'>
                                <Link className="nav-link active fs-5" aria-current="page" to="/myOrder">My Orders</Link>
                            </li>
                            :""
                        }
                            
                            
                        </ul>
                        {(!localStorage.getItem("authToken"))?
                            <div className='d-flex'>
                                <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
                                <Link className="btn bg-white text-success mx-1" to="/createuser">SignUp</Link>
                            </div>
                            :
                            <div>
                                <div className='btn bg-white text-success mx-2' onClick={()=>{setcartView(true)}}>
                                My cart {" "}
                                <Badge pill bg='danger'>{data.length}</Badge>
                                
                                </div>
                                {cartView? <Modal onClose={()=>setcartView(false)}><Cart/></Modal>:null}
                                <div className='btn bg-white text-danger mx-2' onClick={handleLogout}>Logout
                                </div>
                            </div>
                        }
                    </div>
                </nav>
            </div>
        </>
    )
}
