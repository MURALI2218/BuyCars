import { useState, useEffect } from "react"
import api from  "../api"
import Navbar from "./Navbar"
import '../sytles/createcarform.css'
function Home(){
   
    const [data, setDatas] = useState(null)
    const [error, setError] = useState(false)
    
    //Function For Fetching DATA from BACKEND
    const fetchCars = () =>{
                
                    setTimeout( ()=> {
                        api.get('/api/carlists/')
                            .then( (response) =>{
                            return response.data
                            })
                            .then( (data) => {setDatas(data);})
                            .catch( (error) => {console.log(error.message);setError(error.message);
                            })
                    });
               
                return [data, error]
            }
             //Call function for fetch CARS from database
           useEffect(() => {
                fetchCars();
                }, []);

            //Handleing pop FOR car Booking
            function handleCarbookingbtn() {
                return <>
                    hi
                </>
            }
            

            if (!data){
                return <div>{error}</div>
            }
            return <>
                    <Navbar></Navbar>
                    
                    <div className="cars-section">
                    <h2 className="section-title">Cars</h2>

                    <div className="cars-grid">
                        {data.map((car) => (
                        <div key={car.id} className="car-card">
                            <h3 className="car-title">{car.model}</h3>
                            <p className="car-info"><strong>Colour:</strong> {car.colour}</p>
                            <p className="car-info"><strong>Year:</strong> {car.year}</p>
                            <p className="car-price"><strong>Price:</strong> ₹{car.price}</p>
                            <p className="car-date"><strong>Posted Date:</strong> {car.created_at.split('T')[0]}</p>
                            <p className="car-info" ><strong><i class="bi bi-fuel-pump-diesel"></i> Fuel Type : </strong> {car.fueltype.fueltype}</p>
                            <p className="car-info"><strong> <i class="bi bi-gear"></i> Gear Type : </strong> {car.geartype.geartype}</p>
                             <p className="car-price"><strong>Car Location:</strong> {car.carlocation}</p>
                            <div className="car-actions">
                           
                            <button className="btn btn-book" onClick={() => handleCarbookingbtn()}>
                                Book Car
                            </button>
                            </div>
                        </div>
                        ))}
                    </div>
                    </div>
                </>
                    }

export default Home