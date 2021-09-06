import './App.css';
import Customer from "./customers";
import Vehicle from "./vehicle";
import Event from "./event";
import {useState} from "react";
import Modal from "react-modal";

const modalStyles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.25)'
    },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        padding: '1.5em 1.5em 1.5em 1.5em',
        transform: 'translate(-50%, -50%)',
    },
};


let vehicles = [];
let customers = [];
let events = [];

customers.push(new Customer(0, 'Jack Danniels1', 'jack@gmail.com', '0873648426'));
customers.push(new Customer(1, 'Jack Danniels2', 'jack@gmail.com', '0873648426'));
customers.push(new Customer(2, 'Jack Danniels3', 'jack@gmail.com', '0873648426'));
vehicles.push(new Vehicle(0,'Luxury','Lamborghini','Aventador1',2018,'Petrol',2,'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1378&q=80',300,2));
vehicles.push(new Vehicle(1,'Luxury','Lamborghini','Aventador2',2018,'Petrol',2,'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1378&q=80',400,4));
vehicles.push(new Vehicle(2,'Luxury','Lamborghini','Aventador3',2018,'Petrol',2,'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1378&q=80',500,6));
events.push(new Event(0, '1st of October', '3th of October', 'Aventador1', 'Jack Danniels1'));
events.push(new Event(1, '3st of October', '9th of October', 'Aventador2', 'Jack Danniels2'));
events.push(new Event(2, '10st of October', '22th of October', 'Aventador3', 'Jack Danniels3'));


function App() {

    console.log(vehicles);
    console.log(customers);

    const [modalIsOpen, setIsOpen] = useState(false);
    const [modalAdd, setModalAdd] = useState(false);

    const [modalAddC, setModalAddC] = useState(false);
    const [modalUppC, setModalUppC] = useState(false);

    const [modalUppE, setModalUppE] = useState(false);
    const [modalAddE, setModalAddE] = useState(false);

    const [updateC, setUpdateC] = useState(customers);
    const [update, setUpdate] = useState(vehicles);
    const [updateEV, setUpdateEV] = useState(events);

    const [currentItem, setCurrentItem] = useState({});
    const [formData, updateFormData] = useState({});

    console.log(update);
    console.log(currentItem);
    console.log(formData);

    const handleChange = (e) => {
        updateFormData({
            ...formData, [e.target.name]: e.target.value.trim()
        });
    };

  return (
    <div className="App">
      <header className="App-header">
        <div className="VehicleH py-8">
                    <h2>Vehicles</h2>
                    <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        {update.map((vehicle) => (
                            <div key={vehicle.id} className="group relative">
                                <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                                    <img
                                        src={vehicle.picture}
                                        alt='Picture of a car'
                                        className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                                    />
                                </div>
                                <div className="mt-4 flex justify-between">
                                        <span className="text-xl text-white-700 pr-3">{vehicle.year}</span>
                                        <span className="text-xl text-white-700 pr-3">{vehicle.brand}</span>
                                        <span className="text-xl text-white-700">{vehicle.model}</span>
                                </div>
                                <div className="mt-4 flex justify-center">
                                    <span className="text-lg text-white-500 px-2">{vehicle.fuel}</span>
                                    <span className="text-lg text-white-500 px-2">{vehicle.seats} seats</span>
                                    <span className="text-lg text-white-500 px-2">{vehicle.qty} available</span>
                                </div>
                                <div className="mt-4 flex justify-center">
                                    <p className="text-2xl font-medium text-white-900 pl-8">${vehicle.rent}</p>
                                    <p className="text-lg font-medium text-white-600 pl-2 self-center">per day</p>
                                </div>
                                <div className="mt-4 text-xl flex justify-center">
                                    <button className="btn btn-primary" onClick={() => {
                                        setIsOpen(true);
                                        setCurrentItem(vehicle);
                                    }}>Update</button>
                                    <Modal
                                        isOpen={modalIsOpen}
                                        onRequestClose={() => setIsOpen(false)}
                                        style={modalStyles}
                                        ariaHideApp={false}
                                        contentLabel="Update Vehicle"
                                    >
                                        <div className="flex-auto p-3 justify-center">
                                            <h2 className="form-group">Update Vehicle</h2>
                                            <form onSubmit={
                                                (e) => {
                                                    e.preventDefault();
                                                    setUpdate(update.map(i => i.id === currentItem.id ? {...currentItem, ...formData} : i));
                                                }
                                            }>
                                                <div className="form-group">
                                                    <label htmlFor="VehicleType">Vehicle Type</label>
                                                    <input className="form-control" name="type" onChange={handleChange}/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="Brand">Brand</label>
                                                    <input className="form-control" name="brand" onChange={handleChange}/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="Model">Model</label>
                                                    <input className="form-control" name="model" onChange={handleChange}/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="Year">Year</label>
                                                    <input className="form-control" name="year" onChange={handleChange}/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="picture">Picture URL</label>
                                                    <input className="form-control" name="picture" onChange={handleChange}/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="fuel">Fuel type</label>
                                                    <input className="form-control" name="fuel" onChange={handleChange}/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="seats">Number of seats</label>
                                                    <input className="form-control" name="seats" onChange={handleChange}/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="rent">Price per day</label>
                                                    <input className="form-control" name="rent" onChange={handleChange}/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="qty">Number of vehicles left</label>
                                                    <input className="form-control" name="qty" onChange={handleChange}/>
                                                </div>
                                                <div className="form-group">
                                                    <button className="form-control btn btn-primary" type="submit">
                                                        Update Vehicle
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </Modal>
                                    <button className="btn btn-primary" onClick={() => setUpdate(update.filter((i) => i.id !== vehicle.id))}>Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
        <div className="py-8">
            <button className="pr-3 btn btn-primary" onClick={() => {
                setModalAdd(true);
            }}>Add Vehicle</button>
            <Modal
                isOpen={modalAdd}
                onRequestClose={() => setModalAdd(false)}
                style={modalStyles}
                ariaHideApp={false}
                contentLabel="Add Vehicle"
            >
                <div className="flex-auto p-3 justify-center">
                    <h2 className="form-group">Add Vehicle</h2>
                    <form onSubmit={
                        (e) => {
                            e.preventDefault();
                            let newVehicle = new Vehicle(Math.max.apply(Math, update.map((o) => o.id))+1);
                            setUpdate(update.concat({...newVehicle, ...formData}));
                        }
                    }>
                        <div className="form-group">
                            <label htmlFor="VehicleType">Vehicle Type</label>
                            <input className="form-control" name="type" onChange={handleChange}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="Brand">Brand</label>
                            <input className="form-control" name="brand" onChange={handleChange}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="Model">Model</label>
                            <input className="form-control" name="model" onChange={handleChange}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="Year">Year</label>
                            <input className="form-control" name="year" onChange={handleChange}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="picture">Picture URL</label>
                            <input className="form-control" name="picture" onChange={handleChange}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="fuel">Fuel type</label>
                            <input className="form-control" name="fuel" onChange={handleChange}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="seats">Number of seats</label>
                            <input className="form-control" name="seats" onChange={handleChange}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="rent">Price per day</label>
                            <input className="form-control" name="rent" onChange={handleChange}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="qty">Number of vehicles left</label>
                            <input className="form-control" name="qty" onChange={handleChange}/>
                        </div>
                        <div className="form-group">
                            <button className="form-control btn btn-primary" type="submit">
                                Add Vehicle
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
        <div className="CustomerH py-8">
            <h2>Customers</h2>
            <div className="mt-6 grid row-auto gap-y-10 gap-x-6">
            {updateC.map((customer) => (
                <div key={customer.id} className="group relative">
                    <div className="mt-4 flex justify-between">
                        <span className="text-xl text-white-700 pr-3">{customer.name}</span>
                        <span className="text-xl text-white-700 pr-3">{customer.email}</span>
                        <span className="text-xl text-white-700">{customer.phone}</span>
                        <button className="btn btn-primary" onClick={() => {
                            setModalUppC(true);
                            setCurrentItem(customer);
                        }}>Update</button>
                        <Modal
                            isOpen={modalUppC}
                            onRequestClose={() => setModalUppC(false)}
                            style={modalStyles}
                            ariaHideApp={false}
                            contentLabel="Update Customer"
                        >
                            <div className="flex-auto p-3 justify-center">
                                <h2 className="form-group">Update Customer</h2>
                                <form onSubmit={
                                    (e) => {
                                        e.preventDefault();
                                        setUpdateC(updateC.map(i => i.id === currentItem.id ? {...currentItem, ...formData} : i));
                                    }
                                }>
                                    <div className="form-group">
                                        <label htmlFor="Name">Name</label>
                                        <input className="form-control" name="name" onChange={handleChange}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="Email">Email</label>
                                        <input className="form-control" name="email" onChange={handleChange}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="Phone">Phone</label>
                                        <input className="form-control" name="phone" onChange={handleChange}/>
                                    </div>
                                    <div className="form-group">
                                        <button className="form-control btn btn-primary" type="submit">
                                            Update Customer
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </Modal>
                        <button className="btn btn-primary" onClick={() => setUpdateC(updateC.filter((i) => i.id !== customer.id))}>Delete</button>
                    </div>
                </div>
            ))}
        </div></div>
        <div className="py-8">
            <button className="pr-3 btn btn-primary" onClick={() => setModalAddC(true)}>Add Customer</button>
            <Modal
                isOpen={modalAddC}
                onRequestClose={() => setModalAddC(false)}
                style={modalStyles}
                ariaHideApp={false}
                contentLabel="Add Customer"
            >
                <div className="flex-auto p-3 justify-center">
                    <h2 className="form-group">Add Customer</h2>
                    <form onSubmit={
                        (e) => {
                            e.preventDefault();
                            let newCustomer = new Customer(Math.max.apply(Math, updateC.map((o) => o.id))+1);
                            setUpdateC(updateC.concat({...newCustomer, ...formData}));
                        }
                    }>
                        <div className="form-group">
                            <label htmlFor="Name">Name</label>
                            <input className="form-control" name="name" onChange={handleChange}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="Email">Email</label>
                            <input className="form-control" name="email" onChange={handleChange}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="Phone">Phone</label>
                            <input className="form-control" name="phone" onChange={handleChange}/>
                        </div>
                        <div className="form-group">
                            <button className="form-control btn btn-primary" type="submit">
                                Add Customer
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
        <div className="RentalH py-8">
            <h2>Rentals</h2>
            <div className="mt-6 grid row-auto gap-y-10 gap-x-6">
                {updateEV.map((events) => (
                    <div key={events.id} className="group relative">
                        <div className="mt-4 flex justify-between">
                            <span className="text-xl text-white-700 pr-3">{events.start}</span>
                            <span className="text-xl text-white-700 pr-3">{events.end}</span>
                            <span className="text-xl text-white-700 pr-3">{events.vehicle}</span>
                            <span className="text-xl text-white-700 pr-3">{events.customer}</span>
                            <button className="btn btn-primary" onClick={() => {
                                setModalUppE(true);
                                setCurrentItem(events);
                            }}>Update</button>
                            <Modal
                                isOpen={modalUppE}
                                onRequestClose={() => setModalUppE(false)}
                                style={modalStyles}
                                ariaHideApp={false}
                                contentLabel="Update Rental"
                            >
                                <div className="flex-auto p-3 justify-center">
                                    <h2 className="form-group">Update Rental</h2>
                                    <form onSubmit={
                                        (e) => {
                                            e.preventDefault();
                                            setUpdateEV(updateEV.map(i => i.id === currentItem.id ? {...currentItem, ...formData} : i));
                                        }
                                    }>
                                        <div className="form-group">
                                            <label htmlFor="Start">Start date</label>
                                            <input className="form-control" name="start" onChange={handleChange}/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="End">End date</label>
                                            <input className="form-control" name="end" onChange={handleChange}/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="Vehicle">Vehicle Model</label>
                                            <input className="form-control" name="vehicle" onChange={handleChange}/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="Customer">Customer</label>
                                            <input className="form-control" name="customer" onChange={handleChange}/>
                                        </div>
                                        <div className="form-group">
                                            <button className="form-control btn btn-primary" type="submit">
                                                Update Rental
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </Modal>
                            <button className="btn btn-primary" onClick={() => {
                                setUpdateEV(updateEV.filter((i) => i.id !== events.id));
                                setUpdate(update.map(i => i.id === events.id ? {...i, qty: i.qty+1} : i));
                            }}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
          <div className="py-8">
              <button className="pr-3 btn btn-primary" onClick={() => setModalAddE(true)}>Add Rental</button>
              <Modal
                  isOpen={modalAddE}
                  onRequestClose={() => setModalAddE(false)}
                  style={modalStyles}
                  ariaHideApp={false}
                  contentLabel="Add Rental"
              >
                  <div className="flex-auto p-3 justify-center">
                      <h2 className="form-group">Add Rental</h2>
                      <form onSubmit={
                          (e) => {
                              e.preventDefault();
                              let newEvent = new Event(Math.max.apply(Math, updateEV.map((o) => o.id))+1);
                              setUpdateEV(updateEV.concat({...newEvent, ...formData}));
                              setUpdate(update.map(i => i.model === formData.vehicle ? {...i, qty: i.qty-1} : i));
                          }
                      }>
                          <div className="form-group">
                              <label htmlFor="Start">Start date</label>
                              <input className="form-control" name="start" onChange={handleChange}/>
                          </div>
                          <div className="form-group">
                              <label htmlFor="End">End date</label>
                              <input className="form-control" name="end" onChange={handleChange}/>
                          </div>
                          <div className="form-group">
                              <label htmlFor="Vehicle">Vehicle Model</label>
                              <input className="form-control" name="vehicle" onChange={handleChange}/>
                          </div>
                          <div className="form-group">
                              <label htmlFor="Customer">Customer</label>
                              <input className="form-control" name="customer" onChange={handleChange}/>
                          </div>
                          <div className="form-group">
                              <button className="form-control btn btn-primary" type="submit">
                                  Add Rental
                              </button>
                          </div>
                      </form>
                  </div>
              </Modal>
          </div>
      </header>
    </div>
  );
}
export default App;
