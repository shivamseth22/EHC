import React from 'react';
import { useNavigate } from 'react-router-dom';

// Function to convert fractional value to rupee format
const convertToRupees = (value) => {
  // Assuming 1 unit = 10000000 rupees
  return (value * 10000000000).toLocaleString('en-IN', { style: 'currency', currency: 'INR' });
};

// Updated data with fractional values
const cardiologists = [
  { name: 'Dr. Amit Sharma', fees: 0.00000012, yearsExp: 14, address: '321, X Block, New Delhi' },
  { name: 'Dr. Neetu Gupta', fees: 0.00000014, yearsExp: 15, address: '654, Y Street, Mumbai' },
  { name: 'Dr. Rajiv Kumar', fees: 0.00000013, yearsExp: 12, address: '987, Z Avenue, Bangalore' },
  { name: 'Dr. Priya Singh', fees: 0.000000125, yearsExp: 10, address: '123, W Road, Chennai' },
  { name: 'Dr. Manish Patel', fees: 0.00000011, yearsExp: 9, address: '456, V Lane, Hyderabad' },
  { name: 'Dr. Aarti Desai', fees: 0.000000115, yearsExp: 11, address: '789, U Street, Pune' },
  { name: 'Dr. Sandeep Verma', fees: 0.00000014, yearsExp: 13, address: '101, T Road, Ahmedabad' },
  { name: 'Dr. Sheetal Rao', fees: 0.000000125, yearsExp: 8, address: '202, S Block, Kolkata' },
  { name: 'Dr. Rohan Mehta', fees: 0.0000001, yearsExp: 7, address: '303, R Avenue, Jaipur' },
  { name: 'Dr. Sneha Kapoor', fees: 0.000000115, yearsExp: 12, address: '404, Q Lane, Chandigarh' },
  { name: 'Dr. Sanjay Deshmukh', fees: 0.00000013, yearsExp: 14, address: '505, P Road, Lucknow' },
  { name: 'Dr. Neha Joshi', fees: 0.00000012, yearsExp: 10, address: '606, O Block, Dehradun' },
  { name: 'Dr. Arun Nair', fees: 0.000000135, yearsExp: 16, address: '707, N Street, Guwahati' },
  { name: 'Dr. Kavita Agarwal', fees: 0.00000011, yearsExp: 11, address: '808, M Road, Bhopal' },
  { name: 'Dr. Manoj Reddy', fees: 0.000000095, yearsExp: 9, address: '909, L Lane, Varanasi' },
  { name: 'Dr. Aditi Sharma', fees: 0.0000001, yearsExp: 10, address: '1010, K Street, Indore' },
  { name: 'Dr. Ravi Kumar', fees: 0.000000105, yearsExp: 8, address: '1111, J Road, Mysore' },
  { name: 'Dr. Shilpa Jain', fees: 0.00000011, yearsExp: 13, address: '1212, I Block, Thiruvananthapuram' },
  { name: 'Dr. Vikram Mehta', fees: 0.000000125, yearsExp: 14, address: '1313, H Street, Amritsar' },
  { name: 'Dr. Ananya Singh', fees: 0.000000115, yearsExp: 12, address: '1414, G Lane, Srinagar' }
];

const Cardio = () => {
  const navigate = useNavigate();

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className='flex justify-between items-center mb-6'>
        <h1 className="text-2xl font-bold ">List of Cardiologists</h1>
        <button
          onClick={() => navigate('/patient-dashboard')}
          className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-50">
          Back
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {cardiologists.map((doctor, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-lg shadow-md p-4 flex flex-col">
            <h2 className="text-lg font-semibold mb-2">{doctor.name}</h2>
            <p className="text-gray-600 mb-1"><strong>Fees:</strong> {convertToRupees(doctor.fees)}</p>
            <p className="text-gray-600 mb-1"><strong>Years of Experience:</strong> {doctor.yearsExp}</p>
            <p className="text-gray-600 mb-4"><strong>Address:</strong> {doctor.address}</p>
            <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400">
              Book Appointment
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cardio;
