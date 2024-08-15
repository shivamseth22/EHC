import React from 'react';
import physician from "/physician.png"
import dentist from "/dentist.png"
import cardio from "/download.jpeg"
import diet from "/diet.jpeg"
import sergon from "/sergon.png"
// import sergon from "/sergon.png"
// import sergon from "/sergon.png"
import back from "/newbackpng.png"
import { useNavigate } from 'react-router-dom';

const PatientDashboard = () => {
    const navigate = useNavigate()
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-blue-50 ">
            <h1 className="text-2xl font-bold mb-6">FIND YOUR DOCTOR</h1>
            <div className="grid grid-cols-2 gap-4 p-4 w-full max-w-md">
                <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-md"

                    onClick={() => navigate('/physician-list')}
                >
                    <img src={physician} alt="Physician" className="h-12 mb-2" />
                    <span className="text-center font-semibold">PHYSICIAN</span>
                </div>
                <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-md"
                    onClick={() => navigate('/dentist-list')}
                >
                    <img src={dentist} alt="Dentist" className="h-12 mb-2" />
                    <span className="text-center font-semibold">DENTIST</span>
                </div>
                <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-md"
                    onClick={() => navigate('/cardio-list')}>
                    <img src={cardio} alt="Cardiologist" className="h-12 mb-2" />
                    <span className="text-center font-semibold">CARDIOLOGIST</span>
                </div>
                <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-md"
                    onClick={() => navigate('/diet-list')}>
                    <img src={diet} alt="Dietitian" className="h-12 mb-2" />
                    <span className="text-center font-semibold">DIETITIAN</span>
                </div>
                <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-md"
                    onClick={() => navigate('/dentist-list')}>
                    <img src={sergon} alt="Surgeon" className="h-12 mb-2" />
                    <span className="text-center font-semibold">SURGEON</span>
                </div>
                <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-md"
                    onClick={() => navigate('/patient-dashboard')}>
                    <img src={back} alt="Back" className="h-12 mb-2" />
                    <span className="text-center font-semibold text-red-500">BACK</span>
                </div>
            </div>
        </div>
    );
}

export default PatientDashboard;
