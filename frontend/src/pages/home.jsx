import { useState, useEffect, filter } from "react"
import api from  "../api"
import Navbar from "./Navbar"
import '../sytles/createcarform.css'
function Home(){
   
    const [datafromapi, setDatas] = useState([])
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
              
                return [datafromapi, error]
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
            const [searchModel, setSearchModel] = useState("")

            const [filters, setFilters] = useState({
                brand:"",
                model: "",
                year: "",
                colour: "",
                carlocation: ""
            })
            const filteredCars = datafromapi.filter((car) => {

                const searchMatch =
                    car.model.toLowerCase().includes(searchModel.toLowerCase())

                const modelBrand =
                    filters.brand === "" ||
                    car.brand.toLowerCase() === filters.brand.toLowerCase()    

                const modelMatch =
                    filters.model === "" ||
                    car.model.toLowerCase() === filters.model.toLowerCase()

                const yearMatch =
                    filters.year === "" ||
                    String(car.year) === filters.year

                const colourMatch =
                    filters.colour === "" ||
                    car.colour.toLowerCase() === filters.colour.toLowerCase()

                const locationMatch =
                    filters.carlocation === "" ||
                    car.carlocation.toLowerCase() === filters.carlocation.toLowerCase()

                return (
                    searchMatch &&
                    modelBrand &&
                    modelMatch &&
                    yearMatch &&
                    colourMatch &&
                    locationMatch
                )
            })
            

            if (!datafromapi){
                return <div>{error}</div>
            }
            return  <>
                 <Navbar />

    <div className="cars-section">

        <h2 className="section-title">Cars</h2>


        {/* SEARCH */}
        <div className="car-search-section">

            <input
                type="text"
                className="car-search-input"
                placeholder="Enter the Car Model"
                value={searchModel}
                onChange={(e) => setSearchModel(e.target.value)}
            />

        </div>


        {/* FILTERS */}
        <div className="car-filter-section">
            
            <select
                value={filters.brand}
                onChange={(e) =>
                    setFilters({
                        ...filters,
                        brand: e.target.value
                    })
                }
            >
                <option value="">All Brands</option>

                {[...new Set(datafromapi.map(car => car.brand))].map((brand) => (
                    <option key={brand} value={brand}>
                        {brand}
                    </option>
                ))}
            </select>

            <select
                value={filters.model}
                onChange={(e) =>
                    setFilters({
                        ...filters,
                        model: e.target.value
                    })
                }
            >
                <option value="">All Models</option>

                {[...new Set(datafromapi.map(car => car.model))].map((model) => (
                    <option key={model} value={model}>
                        {model}
                    </option>
                ))}
            </select>


            <select
                value={filters.year}
                onChange={(e) =>
                    setFilters({
                        ...filters,
                        year: e.target.value
                    })
                }
            >
                <option value="">All Years</option>

                {[...new Set(datafromapi.map(car => car.year))]
                    .sort((a, b) => b - a)
                    .map((year) => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
            </select>


            <select
                value={filters.colour}
                onChange={(e) =>
                    setFilters({
                        ...filters,
                        colour: e.target.value
                    })
                }
            >
                <option value="">All Colours</option>

                {[...new Set(datafromapi.map(car => car.colour))].map((colour) => (
                    <option key={colour} value={colour}>
                        {colour}
                    </option>
                ))}
            </select>


            <select
                value={filters.carlocation}
                onChange={(e) =>
                    setFilters({
                        ...filters,
                        carlocation: e.target.value
                    })
                }
            >
                <option value="">All Locations</option>

                {[...new Set(datafromapi.map(car => car.carlocation))].map((location) => (
                    <option key={location} value={location}>
                        {location}
                    </option>
                ))}
            </select>

        </div>


        {/* CARS */}
        <div className="cars-grid">

            {filteredCars.length > 0 ? (

                filteredCars.map((car) => (

                    <div key={car.id} className="car-card">

                        <h3 className="car-title">
                            {car.brand} {car.model}
                        </h3>

                        <p className="car-info">
                            <strong>Colour:</strong> {car.colour}
                        </p>

                        <p className="car-info">
                            <strong>Year:</strong> {car.year}
                        </p>

                        <p className="car-price">
                            <strong>Price:</strong> ₹{car.price}
                        </p>

                        <p className="car-date">
                            <strong>Posted Date:</strong>{" "}
                            {car.created_at.split('T')[0]}
                        </p>

                        <p className="car-info">
                            <strong>
                                <i className="bi bi-fuel-pump-diesel"></i>
                                {" "}Fuel Type:
                            </strong>{" "}
                            {car.fueltype.fueltype}
                        </p>

                        <p className="car-info">
                            <strong>
                                <i className="bi bi-gear"></i>
                                {" "}Gear Type:
                            </strong>{" "}
                            {car.geartype.geartype}
                        </p>

                        <p className="car-price">
                            <strong>Car Location:</strong>{" "}
                            {car.carlocation}
                        </p>

                        <div className="car-actions">

                            <button
                                className="btn btn-book"
                                onClick={() => handleCarbookingbtn()}
                            >
                                Book Car
                            </button>

                        </div>

                    </div>

                ))

            ) : (

               <div className="cars-section"> 
         <h2 className="section-title">Cars</h2>
          <div className="cars-grid">
             {datafromapi.map((car) => ( 
                <div key={car.id} className="car-card"> 
                    <h3 className="car-title">{car.brand} {car.model}</h3>
                        <p className="car-info"><strong>Colour:</strong> {car.colour}</p>
                        <p className="car-info"><strong>Year:</strong> {car.year}</p> 
                        <p className="car-price"><strong>Price:</strong> ₹{car.price}</p>
                        <p className="car-date"><strong>Posted Date:</strong> {car.created_at.split('T')[0]}</p>
                        <p className="car-info" ><strong><i className="bi bi-fuel-pump-diesel"></i> Fuel Type : </strong> {car.fueltype.fueltype}</p>
                        <p className="car-info"><strong> <i className="bi bi-gear"></i> Gear Type : </strong> {car.geartype.geartype}</p>
                        <p className="car-price"><strong>Car Location:</strong> {car.carlocation}</p>
                        <div className="car-actions">
                            <button className="btn btn-book" onClick={() => handleCarbookingbtn()}> Book Car </button> 
                        </div> 
                </div> ))} 
            </div>
    </div>

            )}

        </div>

    </div>
    
</>
                    }

export default Home