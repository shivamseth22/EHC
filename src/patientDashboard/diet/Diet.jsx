import React from 'react';
import { useNavigate } from 'react-router-dom';

// Function to convert fractional value to rupee format
const convertToRupees = (value) => {
  // Assuming 1 unit = 10000000 rupees
  return (value * 10000000000).toLocaleString('en-IN', { style: 'currency', currency: 'INR' });
};

// Updated data with fractional values
const dietitians = [
  { name: 'Dr. Nisha Gupta', fees: 0.00000007, yearsExp: 8, address: '101, A Block, Mumbai' },
  { name: 'Dr. Priya Kapoor', fees: 0.000000085, yearsExp: 10, address: '202, B Street, Bangalore' },
  { name: 'Dr. Arvind Rao', fees: 0.000000075, yearsExp: 12, address: '303, C Road, New Delhi' },
  { name: 'Dr. Meera Joshi', fees: 0.00000009, yearsExp: 15, address: '404, D Lane, Hyderabad' },
  { name: 'Dr. Kavita Sharma', fees: 0.00000008, yearsExp: 9, address: '505, E Avenue, Pune' },
  { name: 'Dr. Rajesh Mehta', fees: 0.000000085, yearsExp: 11, address: '606, F Street, Chennai' },
  { name: 'Dr. Shalini Verma', fees: 0.000000095, yearsExp: 14, address: '707, G Block, Ahmedabad' },
  { name: 'Dr. Anjali Deshmukh', fees: 0.000000075, yearsExp: 7, address: '808, H Road, Kolkata' },
  { name: 'Dr. Amit Saxena', fees: 0.00000009, yearsExp: 13, address: '909, I Avenue, Jaipur' },
  { name: 'Dr. Sneha Kulkarni', fees: 0.00000008, yearsExp: 10, address: '1010, J Lane, Chandigarh' },
  { name: 'Dr. Vivek Desai', fees: 0.000000085, yearsExp: 15, address: '1111, K Street, Lucknow' },
  { name: 'Dr. Rashmi Reddy', fees: 0.00000007, yearsExp: 9, address: '1212, L Road, Bhopal' },
  { name: 'Dr. Anil Sharma', fees: 0.000000085, yearsExp: 12, address: '1313, M Avenue, Varanasi' },
  { name: 'Dr. Neha Shah', fees: 0.000000075, yearsExp: 8, address: '1414, N Block, Thiruvananthapuram' },
  { name: 'Dr. Rajiv Patel', fees: 0.00000009, yearsExp: 11, address: '1515, O Lane, Mysore' },
  { name: 'Dr. Anjali Verma', fees: 0.00000008, yearsExp: 10, address: '1616, P Street, Amritsar' },
  { name: 'Dr. Manoj Kumar', fees: 0.000000095, yearsExp: 14, address: '1717, Q Block, Guwahati' },
  { name: 'Dr. Shweta Rao', fees: 0.000000075, yearsExp: 7, address: '1818, R Avenue, Srinagar' },
  { name: 'Dr. Ritu Jain', fees: 0.000000085, yearsExp: 9, address: '1919, S Road, Dehradun' },
  { name: 'Dr. Abhishek Sen', fees: 0.00000009, yearsExp: 13, address: '2020, T Street, Indore' }
];

const Diet = () => {
  const navigate = useNavigate();

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className='flex justify-between items-center mb-6'>
        <h1 className="text-2xl font-bold ">List of Dietitians</h1>
        <button
          onClick={() => navigate('/patient-dashboard')}
          className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-50">
          Back
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {dietitians.map((dietitian, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-lg shadow-md p-4 flex flex-col">
            <h2 className="text-lg font-semibold mb-2">{dietitian.name}</h2>
            <p className="text-gray-600 mb-1"><strong>Fees:</strong> {convertToRupees(dietitian.fees)}</p>
            <p className="text-gray-600 mb-1"><strong>Years of Experience:</strong> {dietitian.yearsExp}</p>
            <p className="text-gray-600 mb-4"><strong>Address:</strong> {dietitian.address}</p>
            <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400">
              Book Appointment
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Diet;
