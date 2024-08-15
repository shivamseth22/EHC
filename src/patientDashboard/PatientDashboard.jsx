import React from 'react';
import physician from "../../public/physician.png"
import dentist from "../../public/dentist.png"
import cardio from "../../public/download.jpeg"
import diet from "../../public/diet.jpeg"
import sergon from "../../public/sergon.png"
// import sergon from "../../public/sergon.png"
// import sergon from "../../public/sergon.png"
import back from "../../public/newbackpng.png"

const PatientDashboard = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-50 ">
      <h1 className="text-2xl font-bold mb-6">FIND YOUR DOCTOR</h1>
      <div className="grid grid-cols-2 gap-4 p-4 w-full max-w-md">
        <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-md">
          <img src={physician} alt="Physician" className="h-12 mb-2" />
          <span className="text-center font-semibold">PHYSICIAN</span>
        </div>
        <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-md">
          <img src={dentist} alt="Dentist" className="h-12 mb-2" />
          <span className="text-center font-semibold">DENTIST</span>
        </div>
        <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-md">
          <img src={cardio} alt="Cardiologist" className="h-12 mb-2" />
          <span className="text-center font-semibold">CARDIOLOGIST</span>
        </div>
        <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-md">
          <img src={diet} alt="Dietitian" className="h-12 mb-2" />
          <span className="text-center font-semibold">DIETITIAN</span>
        </div>
        <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-md">
          <img src={sergon} alt="Surgeon" className="h-12 mb-2" />
          <span className="text-center font-semibold">SURGEON</span>
        </div>
        <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-md">
          <img src={back} alt="Back" className="h-12 mb-2" />
          <span className="text-center font-semibold text-red-500">BACK</span>
        </div>
      </div>
    </div>
  );
}

export default PatientDashboard;
