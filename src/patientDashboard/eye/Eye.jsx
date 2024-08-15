import React from 'react';
import { useNavigate } from 'react-router-dom';

// Function to convert fractional value to rupee format
const convertToRupees = (value) => {
  // Assuming 1 unit = 10000000 rupees
  return (value * 10000000000).toLocaleString('en-IN', { style: 'currency', currency: 'INR' });
};

// Updated data with fractional values
const eyeSpecialists = [
  { name: 'Dr. Ayesha Khan', fees: 0.000000085, yearsExp: 10, address: '101, G Block, Mumbai' },
  { name: 'Dr. Rahul Sharma', fees: 0.00000009, yearsExp: 12, address: '202, H Street, Delhi' },
  { name: 'Dr. Snehal Patel', fees: 0.000000095, yearsExp: 15, address: '303, I Road, Bangalore' },
  { name: 'Dr. Maya Gupta', fees: 0.00000008, yearsExp: 8, address: '404, J Lane, Chennai' },
  { name: 'Dr. Sameer Verma', fees: 0.000000095, yearsExp: 11, address: '505, K Avenue, Kolkata' },
  { name: 'Dr. Nisha Reddy', fees: 0.000000085, yearsExp: 9, address: '606, L Block, Pune' },
  { name: 'Dr. Pradeep Kumar', fees: 0.0000001, yearsExp: 14, address: '707, M Street, Hyderabad' },
  { name: 'Dr. Rina Patel', fees: 0.000000085, yearsExp: 7, address: '808, N Road, Ahmedabad' },
  { name: 'Dr. Vishal Singh', fees: 0.000000095, yearsExp: 13, address: '909, O Avenue, Jaipur' },
  { name: 'Dr. Ananya Desai', fees: 0.00000009, yearsExp: 10, address: '1010, P Lane, Chandigarh' }
];

const Eye = () => {
  const navigate = useNavigate();

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className='flex justify-between items-center mb-6'>
        <h1 className="text-2xl font-bold">List of Eye Specialists</h1>
        <button
          onClick={() => navigate('/patient-dashboard')}
          className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-50">
          Back
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {eyeSpecialists.map((specialist, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-lg shadow-md p-4 flex flex-col">
            <h2 className="text-lg font-semibold mb-2">{specialist.name}</h2>
            <p className="text-gray-600 mb-1"><strong>Fees:</strong> {convertToRupees(specialist.fees)}</p>
            <p className="text-gray-600 mb-1"><strong>Years of Experience:</strong> {specialist.yearsExp}</p>
            <p className="text-gray-600 mb-4"><strong>Address:</strong> {specialist.address}</p>
            <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400">
              Book Appointment
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Eye;
