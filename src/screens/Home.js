import React from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Card from '../components/Card'
// import Carousal from '../components/Carousal'
import { useEffect, useState } from 'react'

export default function Home() {

    const [search, setsearch] = useState('')
    const [foodCat, setfoodCat] = useState([]);
    const [foodItem, setfoodItem] = useState([]);

    const loadData = async () => {
        let response = await fetch("http://localhost:5000/api/foodData", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        response = await response.json();
        // console.log(response[0],response[1]);
        setfoodItem(response[0]);
        setfoodCat(response[1]);
    }

    useEffect(() => {
        loadData()

    }, [])


    return (
        <div>
            <div><Navbar /></div>
            <div><div id="carouselExampleFade" className="carousel slide carousel-fade " data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>

                <div className="carousel-inner " id='carousel'>
                    <div className=" carousel-caption  " style={{ zIndex: "9" }}>
                        <div className=" d-flex justify-content-center">  {/* justify-content-center, copy this <form> from navbar for search box */}
                            <input className="form-control me-2 w-75 bg-white text-dark" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setsearch(e.target.value)}}/>
                            {/* <button className="btn text-white bg-success" type="submit">Search</button> */}
                        </div>
                    </div>
                    <div className="carousel-item active" >
                        <img src="https://source.unsplash.com/random/300x100/?burger" className="d-block w-100  " style={{ filter: "brightness(50%)" }} alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/300x100/?pastry" className="d-block w-100 " style={{ filter: "brightness(50%)" }} alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/300x100/?restraunt" className="d-block w-100 " style={{ filter: "brightness(50%)" }} alt="..." />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div></div>
            <div className='container '>
                {
                    foodCat !== []
                        ? foodCat.map((data) => {
                            return (<div className='row mb-3'>
                                <div key={data._id} className="fs-3 m-3">
                                    {data.CategoryName}
                                </div>
                                <hr />
                                {foodItem !== [] ? foodItem.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLocaleLowerCase()))).map(filterItems => {
                                    return (
                                        <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                                            <Card foodItem={filterItems}
                                                options={filterItems.options[0]}
                                            ></Card>
                                        </div>
                                    )
                                })

                                    : <div>No such data found</div>}
                            </div>
                            )
                        })
                        : ""
                }
            </div>
            <div><Footer /></div>
        </div>
    )
}
