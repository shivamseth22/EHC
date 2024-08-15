import React from 'react';

const cardiologists = [
  { name: 'Dr. Amit Sharma', fees: '₹1200', yearsExp: 14, address: '321, X Block, New Delhi' },
  { name: 'Dr. Neetu Gupta', fees: '₹1400', yearsExp: 15, address: '654, Y Street, Mumbai' },
  { name: 'Dr. Rajiv Kumar', fees: '₹1300', yearsExp: 12, address: '987, Z Avenue, Bangalore' },
  { name: 'Dr. Priya Singh', fees: '₹1250', yearsExp: 10, address: '123, W Road, Chennai' },
  { name: 'Dr. Manish Patel', fees: '₹1100', yearsExp: 9, address: '456, V Lane, Hyderabad' },
  { name: 'Dr. Aarti Desai', fees: '₹1150', yearsExp: 11, address: '789, U Street, Pune' },
  { name: 'Dr. Sandeep Verma', fees: '₹1400', yearsExp: 13, address: '101, T Road, Ahmedabad' },
  { name: 'Dr. Sheetal Rao', fees: '₹1250', yearsExp: 8, address: '202, S Block, Kolkata' },
  { name: 'Dr. Rohan Mehta', fees: '₹1000', yearsExp: 7, address: '303, R Avenue, Jaipur' },
  { name: 'Dr. Sneha Kapoor', fees: '₹1150', yearsExp: 12, address: '404, Q Lane, Chandigarh' },
  { name: 'Dr. Sanjay Deshmukh', fees: '₹1300', yearsExp: 14, address: '505, P Road, Lucknow' },
  { name: 'Dr. Neha Joshi', fees: '₹1200', yearsExp: 10, address: '606, O Block, Dehradun' },
  { name: 'Dr. Arun Nair', fees: '₹1350', yearsExp: 16, address: '707, N Street, Guwahati' },
  { name: 'Dr. Kavita Agarwal', fees: '₹1100', yearsExp: 11, address: '808, M Road, Bhopal' },
  { name: 'Dr. Manoj Reddy', fees: '₹950', yearsExp: 9, address: '909, L Lane, Varanasi' },
  { name: 'Dr. Aditi Sharma', fees: '₹1000', yearsExp: 10, address: '1010, K Street, Indore' },
  { name: 'Dr. Ravi Kumar', fees: '₹1050', yearsExp: 8, address: '1111, J Road, Mysore' },
  { name: 'Dr. Shilpa Jain', fees: '₹1100', yearsExp: 13, address: '1212, I Block, Thiruvananthapuram' },
  { name: 'Dr. Vikram Mehta', fees: '₹1250', yearsExp: 14, address: '1313, H Street, Amritsar' },
  { name: 'Dr. Ananya Singh', fees: '₹1150', yearsExp: 12, address: '1414, G Lane, Srinagar' }
];

const Cardio = () => {
  return (
    <div className="p-4 md:p-6 lg:p-8">
      <h1 className="text-2xl font-bold mb-6">List of Cardiologists</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {cardiologists.map((doctor, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-lg shadow-md p-4 flex flex-col">
            <h2 className="text-lg font-semibold mb-2">{doctor.name}</h2>
            <p className="text-gray-600 mb-1"><strong>Fees:</strong> {doctor.fees}</p>
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
