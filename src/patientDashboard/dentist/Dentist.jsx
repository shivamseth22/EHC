import React from 'react';

const doctors = [
  { name: 'Dr. Anil Kumar', fees: '₹900', yearsExp: 11, address: '123, A Block, New Delhi' },
  { name: 'Dr. Priya Patel', fees: '₹1100', yearsExp: 13, address: '456, B Street, Mumbai' },
  { name: 'Dr. Rajesh Gupta', fees: '₹950', yearsExp: 14, address: '789, C Avenue, Bangalore' },
  { name: 'Dr. Sunita Sharma', fees: '₹1050', yearsExp: 10, address: '101, D Road, Chennai' },
  { name: 'Dr. Vikram Singh', fees: '₹980', yearsExp: 7, address: '202, E Lane, Hyderabad' },
  { name: 'Dr. Neha Agarwal', fees: '₹1150', yearsExp: 12, address: '303, F Street, Pune' },
  { name: 'Dr. Ramesh Desai', fees: '₹1250', yearsExp: 15, address: '404, G Road, Ahmedabad' },
  { name: 'Dr. Anjali Rao', fees: '₹1000', yearsExp: 9, address: '505, H Block, Kolkata' },
  { name: 'Dr. Sanjay Menon', fees: '₹1020', yearsExp: 8, address: '606, I Street, Jaipur' },
  { name: 'Dr. Aarti Kapoor', fees: '₹900', yearsExp: 11, address: '707, J Avenue, Chandigarh' },
  { name: 'Dr. Harpreet Kaur', fees: '₹1100', yearsExp: 13, address: '808, K Lane, Lucknow' },
  { name: 'Dr. Manoj Kumar', fees: '₹1300', yearsExp: 14, address: '909, L Road, Dehradun' },
  { name: 'Dr. Sushma Reddy', fees: '₹1200', yearsExp: 10, address: '1010, M Block, Srinagar' },
  { name: 'Dr. Ravi Sharma', fees: '₹1400', yearsExp: 16, address: '1111, N Street, Guwahati' },
  { name: 'Dr. Meera Iyer', fees: '₹1250', yearsExp: 9, address: '1212, O Lane, Bhopal' },
  { name: 'Dr. Ashok Jain', fees: '₹950', yearsExp: 7, address: '1313, P Road, Varanasi' },
  { name: 'Dr. Kavita Mehta', fees: '₹980', yearsExp: 12, address: '1414, Q Street, Indore' },
  { name: 'Dr. Rahul Singh', fees: '₹1020', yearsExp: 10, address: '1515, R Avenue, Mysore' },
  { name: 'Dr. Sneha Joshi', fees: '₹1080', yearsExp: 11, address: '1616, S Road, Thiruvananthapuram' },
  { name: 'Dr. Manish Sharma', fees: '₹950', yearsExp: 8, address: '1717, T Lane, Amritsar' }
];

const Dentist = () => {
  return (
    <div className="p-4 md:p-6 lg:p-8">
      <h1 className="text-2xl font-bold mb-6">List of Dentist</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {doctors.map((doctor, index) => (
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

export default Dentist;
