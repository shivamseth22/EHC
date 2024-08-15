import React from 'react';
import { useNavigate } from 'react-router-dom';

// Function to convert fractional value to rupee format
const convertToRupees = (value) => {
  // Assuming 1 unit = 10000000 rupees
  return (value * 10000000000).toLocaleString('en-IN', { style: 'currency', currency: 'INR' });
};

// Updated data with fractional values
const surgeons = [
  { name: 'Dr. Vikram Singh', fees: 0.00000015, yearsExp: 20, address: 'A-101, Central Road, Delhi' },
  { name: 'Dr. Sunita Kapoor', fees: 0.00000014, yearsExp: 18, address: 'B-202, Main Street, Mumbai' },
  { name: 'Dr. Anil Verma', fees: 0.00000016, yearsExp: 22, address: 'C-303, Park Avenue, Bangalore' },
  { name: 'Dr. Shalini Gupta', fees: 0.000000155, yearsExp: 15, address: 'D-404, Lake View, Hyderabad' },
  { name: 'Dr. Rajesh Kumar', fees: 0.000000145, yearsExp: 19, address: 'E-505, Green Park, Pune' },
  { name: 'Dr. Pooja Rao', fees: 0.00000015, yearsExp: 17, address: 'F-606, River Side, Chennai' },
  { name: 'Dr. Ajay Patel', fees: 0.00000014, yearsExp: 16, address: 'G-707, Hill Road, Kolkata' },
  { name: 'Dr. Meena Desai', fees: 0.00000016, yearsExp: 21, address: 'H-808, Ocean Drive, Ahmedabad' },
  { name: 'Dr. Sanjay Saxena', fees: 0.000000155, yearsExp: 14, address: 'I-909, City Center, Jaipur' },
  { name: 'Dr. Nidhi Sharma', fees: 0.000000145, yearsExp: 18, address: 'J-1010, Mall Road, Chandigarh' },
  { name: 'Dr. Amit Bhargava', fees: 0.00000015, yearsExp: 20, address: 'K-1111, Market Street, Lucknow' },
  { name: 'Dr. Renu Joshi', fees: 0.00000014, yearsExp: 19, address: 'L-1212, King’s Road, Bhopal' },
  { name: 'Dr. Manoj Nair', fees: 0.00000016, yearsExp: 22, address: 'M-1313, Queen’s Avenue, Varanasi' },
  { name: 'Dr. Priya Sinha', fees: 0.000000155, yearsExp: 17, address: 'N-1414, High Street, Thiruvananthapuram' },
  { name: 'Dr. Arun Mehta', fees: 0.000000145, yearsExp: 15, address: 'O-1515, Diamond Road, Mysore' },
  { name: 'Dr. Seema Kulkarni', fees: 0.00000015, yearsExp: 20, address: 'P-1616, Ruby Lane, Amritsar' },
  { name: 'Dr. Dinesh Reddy', fees: 0.00000014, yearsExp: 18, address: 'Q-1717, Sapphire Street, Guwahati' },
  { name: 'Dr. Sneha Joshi', fees: 0.00000016, yearsExp: 21, address: 'R-1818, Pearl Avenue, Srinagar' },
  { name: 'Dr. Vikash Mishra', fees: 0.000000155, yearsExp: 19, address: 'S-1919, Emerald Road, Dehradun' },
  { name: 'Dr. Aarti Rao', fees: 0.000000145, yearsExp: 17, address: 'T-2020, Opal Lane, Indore' }
];

const Sergon = () => {
  const navigate = useNavigate();

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className='flex justify-between items-center mb-6'>
        <h1 className="text-2xl font-bold">List of Surgeons</h1>
        <button
          onClick={() => navigate('/patient-dashboard')}
          className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-50">
          Back
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {surgeons.map((surgeon, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-lg shadow-md p-4 flex flex-col">
            <h2 className="text-lg font-semibold mb-2">{surgeon.name}</h2>
            <p className="text-gray-600 mb-1"><strong>Fees:</strong> {convertToRupees(surgeon.fees)}</p>
            <p className="text-gray-600 mb-1"><strong>Years of Experience:</strong> {surgeon.yearsExp}</p>
            <p className="text-gray-600 mb-4"><strong>Address:</strong> {surgeon.address}</p>
            <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400">
              Book Appointment
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sergon;
