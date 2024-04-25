import React from 'react';
import '../../Styles/SelectRole.css'
import RecipeReviewCard from './RecipeReviewCard';
import { playerDescription, serviceProviderDescription, moreDescriptionForPlayer, moreDescriptionForServiceProvider } from '../../Constants/Description'
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { setNavbarState } from '../../redux/slices/NavbarStateSlice'

const SelectRole = () => {

    const dispatch = useDispatch()
    dispatch(setNavbarState(false))

    const navigate = useNavigate()

    return (
        <>
            <div style={{ backgroundImage: 'url("pexels-pixabay-46798.jpg")', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundAttachment: 'fixed', border: '2px solid black', height: "100vh", overflow: "auto" }} >
                <p className='text-center text-xl g-font'>Select the role you wish to register for on BookMySport</p>
                <div className="flex justify-center items-center w-1/2 mx-auto my-9">
                    <div className="mx-5">
                        <RecipeReviewCard role={"Player"} description={playerDescription} moreDescription={moreDescriptionForPlayer} image={"player.jpg"} redirect={"player"} />
                    </div>
                    <div className="mx-5">
                        <RecipeReviewCard role={"Serviceprovider"} description={serviceProviderDescription} moreDescription={moreDescriptionForServiceProvider} image={"serviceprovider.jpg"} redirect={"sp"} />
                    </div>
                </div>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <div>
                        <button
                            onClick={() => navigate('/login')}
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SelectRole;
