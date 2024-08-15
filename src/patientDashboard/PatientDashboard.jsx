import React from 'react';
import physician from "/physician.png";
import dentist from "/dentist.png";
import cardio from "/download.jpeg";
import diet from "/diet.jpeg";
import sergon from "/sergon.png";
import eye from "/eye.png";
import back from "/newbackpng.png";
import { useNavigate } from 'react-router-dom';

const PatientDashboard = () => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-blue-50">
            <h1 className="text-3xl font-bold mb-8">FIND YOUR DOCTOR</h1>
            <div className="grid grid-cols-2 gap-6 p-4 w-full max-w-lg">
                <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105"
                    onClick={() => navigate('/physician-list')}
                >
                    <img src={physician} alt="Physician" className="h-20 w-24 mb-4" />
                    <span className="text-center font-semibold text-lg">PHYSICIAN</span>
                </div>
                <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105"
                    onClick={() => navigate('/dentist-list')}
                >
                    <img src={dentist} alt="Dentist" className="h-20 w-24 mb-4" />
                    <span className="text-center font-semibold text-lg">DENTIST</span>
                </div>
                <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105"
                    onClick={() => navigate('/cardio-list')}
                >
                    <img src={cardio} alt="Cardiologist" className="h-20 w-24 mb-4" />
                    <span className="text-center font-semibold text-lg">CARDIOLOGIST</span>
                </div>
                <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105"
                    onClick={() => navigate('/diet-list')}
                >
                    <img src={diet} alt="Dietitian" className="h-20 w-24 mb-4" />
                    <span className="text-center font-semibold text-lg">DIETITIAN</span>
                </div>
                <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105"
                    onClick={() => navigate('/sergon-list')}
                >
                    <img src={sergon} alt="Surgeon" className="h-20 w-24 mb-4" />
                    <span className="text-center font-semibold text-lg">SURGEON</span>
                </div>
                <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105"
                    onClick={() => navigate('/eye-list')}
                >
                    <img src={eye} alt="Back" className="h-20 w-24 mb-4" />
                    <span className="text-center font-semibold text-lg">Ophthalmologist</span>
                </div>
            </div>
        </div>
    );
}

export default PatientDashboard;
