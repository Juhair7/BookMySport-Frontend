import React, { useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { Trash2, CloudUpload } from 'lucide-react'
import {apiConfig} from '../../Constants/ApiConfig'

const SportsUpload = () => {

    const navigate = useNavigate()

    const [sports, setSports] = useState([{ id: 1 }]);
    const [sportsData, setSportsData] = useState([{ id: 1, sport: '', numberOfCourts: 0, price: 0 }]);


    const handleAddSport = () => {
        const newSport = { id: sports.length + 1, sport: '', numberOfCourts: 0, price: 0 };
        setSports(prevSports => [...prevSports, { id: prevSports.length + 1 }]);
        setSportsData(prevData => [...prevData, newSport]);
    };

    const handleDeleteSport = (id) => {
        setSports(prevSports => prevSports.filter(sport => sport.id !== id));
        setSportsData(prevData => prevData.filter(sport => sport.id !== id));
    };

    const handleInputChange = (e, id) => {
        const { name, value } = e.target;
        const capitalizedValue = value.replace(/\b\w/g, match => match.toUpperCase());

        setSportsData(prevData => {
            const updatedSports = prevData.map(sport => {
                if (sport.id === id) {
                    return { ...sport, [name]: capitalizedValue };
                }
                return sport;
            });
            return updatedSports;
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const requestData = sportsData.map(({ id, ...rest }) => rest);
        const checkEmptyData = (sportName, price, courtNumber) => {
            if (sportName === '' || price === '' || courtNumber === '') {
                return true;
            } else {
                return false;
            }
        };

        if (requestData.every(({ sport, price, numberOfCourts }) => checkEmptyData(sport, price, numberOfCourts))) {
            toast.error("Please upload atleast one sport", {
                duration: 5000,
                position: 'top-right'
            });

            return 
        }


        const loadingToastId = toast.loading('Uploading Sports', {
            duration: Infinity,
            position: 'top-right'
        });

        try {
            const headers = {
                "Content-Type": "application/json",
                "role": Cookies.get("role"),
                "token": Cookies.get("token")
            }
            const response = await axios.post(`${apiConfig.sp}/uploadsports`, requestData, { headers })

            const data = await response.data

            if (data.success) {
                toast.success('Sports Uploaded Succesfully', {
                    duration: 3000,
                    position: "top-right"
                })
                setTimeout(() => {
                    navigate('/updatearenadetails');
                }, 2000);
            }
            else {
                toast.error(data.message, {
                    duration: 5000,
                    position: 'top-right'
                });
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            }
        } catch (error) {
            toast.error('Something went wrong. Try again', {
                duration: 3000,
                position: 'top-right'
            });
        }
        finally {
            toast.dismiss(loadingToastId);
        }
    }

    const renderSportsForm = () => {
        return sports.map(sport => (
            <div key={sport.id} className="bg-white p-8 rounded shadow-md max-w-md w-full mx-auto mt-4">
                <h2 className="text-2xl font-semibold mb-4">Upload Sport {sport.id}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor={`sportName${sport.id}`} className="block text-sm font-medium text-gray-700">Sport Name</label>
                            <input type="text" id={`sport${sport.id}`} name="sport" className="mt-1 p-2 w-full border rounded-md" onChange={(e) => handleInputChange(e, sport.id)} required />
                        </div>
                    </div>
                    <div className="mt-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Number of courts</label>
                        <input type="number" id="numberOfCourts" name="numberOfCourts" className="mt-1 p-2 w-full border rounded-md" onChange={(e) => handleInputChange(e, sport.id)} required />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Price Per Hour</label>
                        <input type="number" id="price" name="price" className="mt-1 p-2 w-full border rounded-md" onChange={(e) => handleInputChange(e, sport.id)} required />
                    </div>
                </form>
                <Trash2 onClick={() => handleDeleteSport(sport.id)} style={{ cursor: "pointer", marginTop: "25px", marginLeft: "5px" }} />
            </div>
        ));
    };

    return (
        <>
            <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
                {renderSportsForm()}
                <button onClick={handleAddSport} className="mt-4 p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600">Add Next Sport</button>
                <button onClick={handleSubmit} className="mt-6 p-3 bg-green-500 text-white rounded-md hover:bg-green-600">Upload Sports</button>
                <CloudUpload onClick={handleSubmit} style={{ cursor: "pointer", marginTop: "25px", marginLeft: "5px" }} />
            </div>
            <Toaster />
        </>
    );
};

export default SportsUpload;
