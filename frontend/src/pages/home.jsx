import { useState, useEffect } from "react"
import api from  "../api"
import Navbar from "./Navbar"

function Home(){
    const [colour, setcarcolour] = useState("")
    const [model, setcarmodel] = useState("")
    const [year, setcarmfyear] = useState("")
    const [price , setcarprice] = useState('')
    const [data, setDatas] = useState(null)
    const [error, setError] = useState(false)
    const name ='murali'

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
                    },1000);
               
                return [data, error]
            }


            //Model For ADDING DATA  to BACKEND
           const createcar = (e) =>{
            e.preventDefault();
            api.post('/api/carlists/', {model, colour,name, year, price})
            .then( (res)=>{
                if (res.status === 201){
                    alert("Car has been added to sales")
                    setDatas((previousData) => [...previousData,res.data])
                    setcarcolour("")
                    setcarmfyear("")
                    setcarprice('')
                    setcarmodel('')
                }else (
                    alert("Failed to create car for sale")
                )
            })
           }

           //Function to delete Data from DATABASE
           const handleDelete=( (id) => {
            api.delete(`/api/deletecar/${id}/`)
            .then( (res) =>{
                if (res.status === 204){
                    alert('car details has been deleted')
                    setDatas((previousData) => previousData.filter((car) => car.id !== id)
            );
                }
           })
            .catch( (error) =>{
                console.log("DELETE ERROR:", error);
                    console.log("SERVER RESPONSE:", error.response?.data);
                    alert("cannot delete the car data")
            })
           
           })
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
                    <h2>Create New CAR for sale</h2>
                    <form id="car-sale-form" onSubmit={createcar}>
                        <div>
                            <label htmlFor="model">Car Model:</label><br/>
                            <input type="text" id="model" name="model"
                            value={model}
                            onChange={(e) => setcarmodel(e.target.value)}
                            /><br/>
                        </div>

                        <div>
                            <label htmlFor="colour">Colour:</label><br/>
                            <input type="text" id="colour" name="colour"  value={colour}

                            onChange={(e) => setcarcolour(e.target.value)} /><br/>
                        </div>

                        <div>
                            <label htmlFor="year">Year:</label><br/>
                            <input type="" id="year" name="year" 
                             value={year}
                            onChange={(e) => setcarmfyear(e.target.value)}  
                            /><br/>
                        </div>

                        <div>
                            <label htmlFor="price">Price (₹):</label><br/>
                            <input type="" id="price" name="price"  
                             value={price}
                            onChange={(e) => setcarprice(e.target.value)}
                            /><br/><br />
                        </div>

                        <button type="submit">Submit</button>
                        </form>
                    <h2>Cars</h2>

                     {data.map ((car)=> (
                        <div key={car.id}>
                            <h3>{car.model}</h3>
                            <p>Colour: {car.colour}</p>
                            <p>Year: {car.year}</p>
                            <p>Price: ₹{car.price}</p>
                            <p>Posted Date: {car.created_at}</p>
                            <button onClick={() => handleDelete(car.id)}>detele</button>
                            <button onClick={() => handleCarbookingbtn()}>Book Car</button>
                        </div>
                    ))}
                    </>
}

export default Home