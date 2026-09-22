import { useState, useEffect } from 'react'
import api from '../api'
import '../sytles/carstables.css'
import Navbar from './Navbar'

function Owncarslist(){
    const[brand, setcarbrand] = useState("")
    const [colour, setcarcolour] = useState("")
    const [model, setcarmodel] = useState("")
    const [year, setcarmfyear] = useState("")
    const [price , setcarprice] = useState('')
    const [fueltypeform , setcarfueltype] = useState('')
    const [geartypeform, setcargeartype] =useState('')
    const [carloaction, setlocation] =useState('')

    const [cardata, setdatas] = useState([])
    const [geartype, setgeartypes] = useState([])
    const [fueltype, setfueltypes] = useState([])

    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(true)


    
    //GETTING CARS DATA BROM API
    const owncars = () =>{
        setTimeout( ()=>{
            api.get('/api/carsforsale/')
            .then( (response) => {setdatas(response.data)})
            .catch((error) => {setError(error.message)})
            .finally(() => {setLoading(false)})
        })  
        }
        useEffect(() => {owncars();}, []);
        // GETTING GEAR TYPES FROM API
        const geartypes= ()=>{
            setTimeout( ()=>{
                api.get('api/geartypes/')
                .then( (response) => {setgeartypes(response.data)})
                .catch( (error)=> {setError(error.message)})
                .finally(()=>{setLoading(false)})
            })
            
        }
        useEffect(()=>{geartypes();}, [])

        //GETTING FUEL TYPES FROM API
        const fueltypes = () =>{
            setTimeout( ()=>{
                api.get('api/fueltypes/')
                .then( (response)=>{ setfueltypes(response.data)})
                .catch( (error)=>{setError(error)})
                .finally(()=>setLoading(false))
            })
        }
        useEffect(()=>{fueltypes();}, [])

         //Model For ADDING DATA  to BACKEND
           const createcar = (e) =>{
            
            e.preventDefault();

            const carformdata =new FormData();
                            
                formData.append("brand", brand);
                formData.append("model", model);
                formData.append("colour", colour);
                formData.append("year", year);
                formData.append("price", price);
                // formData.append("image", image); 
                formData.append("fueltype_id", fueltypeform)  
                formData.append("geartype_id", geartypeform)   
                 formData.append("carlocation", carloaction)       
                        
           
            api.post('/api/carlists/', carformdata)
            .then( (res)=>{
                if (res.status === 201){
                    alert("Car has been added to sales")
                    
                    setdatas((previousData) => [...previousData,res.data])
                    setcarcolour("")
                    setcarmfyear("")
                    setcarprice('')
                    setcarmodel('')
                    setcarfueltype("")
                    setcargeartype('')
                    setlocation("")
                    setcarbrand("")
                   
                }else (
                    alert("Failed to create car for sale")
                )
            })
           }

            //Function to delete Data from DATABASE
           const handleDelete=( (id) => {
            api.delete(`/api/edituser_salescars/${id}/`)
            .then( (res) =>{
                if (res.status === 204){
                    alert('car details has been deleted')
                    setdatas((previousData) => previousData.filter((car) => car.id !== id)
            );
                }
           })
            .catch( (error) =>{
                console.log("DELETE ERROR:", error);
                    console.log("SERVER RESPONSE:", error.response?.data);
                    alert("cannot delete the car data")
            })
           
           })


        if (error) {return <p>{error}</p>}
        if (loading) {return <p>Loading...</p>}
        return(
                <>
                <Navbar></Navbar>
                {cardata.length>0 ? 
                <div className="car-table-container">
                    <table className="car-table">
                      <thead>
                            <tr>
                                <th>Car Brand</th>
                                <th>Car Model</th>
                                <th>Colour</th>
                                <th>Year Model</th>
                                <th>Car Price</th>
                                <th>Fuel Type</th>
                               <th>Gear Type</th>
                                <th>Posted Date</th>
                                <th>Post Status</th>
                               <th>Owner name</th>
                                <th>Delete POST</th>
                            </tr>
                        </thead>
                        <tbody>
                        {cardata.map((car) => (
                            <tr key={car.id}>
                            <td>{car.brand}</td>
                            <td>{car.model}</td>
                            <td>{car.colour}</td>
                            <td>{car.year}</td>
                            <td>{car.price}</td>
                            <td>{car.fueltype.fueltype}</td>
                            <td>{car.geartype.geartype}</td>
                            <td>{car.created_at ? car.created_at.split('T')[0] : 'N/A'}</td>
                            <td>{car.post_status.post_status}</td>
                            <td>{car.owner.username}</td>
                            <td><button onClick={ ()=>handleDelete(car.id)} className='btn-delete'>Delete</button></td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                :
                <h3 className='emptymessage'>You Have Not posted any Cars for Sale</h3>}
               
               <div className="form-card">
                    <h2 className="form-title">Create New Car for Sale</h2>
                    <form id="car-sale-form" className="car-form" onSubmit={createcar}>
                        <input
                        type="file"
                        accept="image/*"
                        
                        />
                        <div className="form-group">
                        <label htmlFor="model" className="form-label">
                            Car Brand
                        </label>
                        <input
                            type="text"
                            id="brand"
                            name="brand"
                            className="form-input"
                            placeholder="e.g., Honda"
                            value={brand}
                            onChange={(e) => setcarbrand(e.target.value)}
                        />
                        </div>

                        <div className="form-group">
                        <label htmlFor="model" className="form-label">
                            Car Model
                        </label>
                        <input
                            type="text"
                            id="model"
                            name="model"
                            className="form-input"
                            placeholder="e.g., Honda City"
                            value={model}
                            onChange={(e) => setcarmodel(e.target.value)}
                        />
                        </div>

                        <div className="form-group">
                        <label htmlFor="colour" className="form-label">
                            Colour
                        </label>
                        <input
                            type="text"
                            id="colour"
                            name="colour"
                            className="form-input"
                            placeholder="e.g., Metallic Black"
                            value={colour}
                            onChange={(e) => setcarcolour(e.target.value)}
                        />
                        </div>

                        <div className="form-group">
                        <label htmlFor="year" className="form-label">
                            Manufacturing Year
                        </label>
                        <input
                            type="number"
                            id="year"
                            name="year"
                            className="form-input"
                            placeholder="e.g., 2022"
                            value={year}
                            onChange={(e) => setcarmfyear(e.target.value)}
                        />
                        </div>

                         <div className="form-group">
                        <label htmlFor="year" className="form-label">
                            Car Location
                        </label>
                        <input
                            type="text"
                            id="loaction"
                            name="year"
                            className="form-input"
                            placeholder="e.g.,Chennai"
                            value={carloaction}
                            onChange={(e) => setlocation(e.target.value)}
                        />
                        </div>

                        <div className="form-group">
                        <label htmlFor="price" className="form-label">
                            Price (₹)
                        </label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            className="form-input"
                            placeholder="e.g., 850000"
                            value={price}
                            onChange={(e) => setcarprice(e.target.value)}
                        />
                        </div>
                        <div className="form-group">
                        <label htmlFor="price" className="form-label">
                            Fuel Type 
                        </label>
                        <select
                        id="fueltype_id"
                        className="form-input"
                        value={fueltypeform}
                        onChange={ (e) => setcarfueltype(e.target.value)}
                        >
                            
                            <option value=""> Select Fuel Variant</option>
                             {fueltype.map((fuel) => (
                            <option key={fuel.id} value={fuel.id}>{fuel.fueltype}</option>
                             ))}
                            </select>
                        </div>

                        <div className="form-group">
                        <label htmlFor="price" className="form-label">
                            Gear Type 
                        </label>
                        <select
                        id="geartype_id"
                        className="form-input"
                         value={geartypeform}
                        onChange={ (e) => setcargeartype(e.target.value)}
                        >
                            <option value=""> Select Gear Type</option>
                             {geartype.map((gear) => (
                                
                            <option key={gear.id} value={gear.id}>{gear.geartype}</option>
                             ))}
                            </select>
                        </div>

                        <button type="submit" className="submit-btn">
                        Post Car for Sale
                        </button>
                    </form>
                    </div>
                </>
    )
}
export default Owncarslist