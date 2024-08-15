import React from 'react';

const physicians = [
  { name: 'Dr. Ramesh Patel', fees: '₹800', yearsExp: 10, address: '101, A Block, Mumbai' },
  { name: 'Dr. Priya Nair', fees: '₹950', yearsExp: 12, address: '202, B Street, Bangalore' },
  { name: 'Dr. Suresh Gupta', fees: '₹900', yearsExp: 15, address: '303, C Road, New Delhi' },
  { name: 'Dr. Anjali Sharma', fees: '₹850', yearsExp: 8, address: '404, D Lane, Hyderabad' },
  { name: 'Dr. Manoj Desai', fees: '₹950', yearsExp: 11, address: '505, E Avenue, Pune' },
  { name: 'Dr. Kavita Verma', fees: '₹800', yearsExp: 9, address: '606, F Street, Chennai' },
  { name: 'Dr. Arvind Rao', fees: '₹1000', yearsExp: 14, address: '707, G Block, Ahmedabad' },
  { name: 'Dr. Sneha Kulkarni', fees: '₹850', yearsExp: 7, address: '808, H Road, Kolkata' },
  { name: 'Dr. Rajesh Mehta', fees: '₹950', yearsExp: 13, address: '909, I Avenue, Jaipur' },
  { name: 'Dr. Shalini Joshi', fees: '₹900', yearsExp: 10, address: '1010, J Lane, Chandigarh' },
  { name: 'Dr. Vivek Singh', fees: '₹1050', yearsExp: 15, address: '1111, K Street, Lucknow' },
  { name: 'Dr. Neha Shah', fees: '₹850', yearsExp: 9, address: '1212, L Road, Bhopal' },
  { name: 'Dr. Ajay Kumar', fees: '₹950', yearsExp: 11, address: '1313, M Avenue, Varanasi' },
  { name: 'Dr. Meera Deshmukh', fees: '₹800', yearsExp: 8, address: '1414, N Block, Thiruvananthapuram' },
  { name: 'Dr. Anil Saxena', fees: '₹1000', yearsExp: 12, address: '1515, O Lane, Mysore' },
  { name: 'Dr. Rashmi Reddy', fees: '₹900', yearsExp: 10, address: '1616, P Street, Amritsar' },
  { name: 'Dr. Vishal Kapoor', fees: '₹1050', yearsExp: 14, address: '1717, Q Block, Guwahati' },
  { name: 'Dr. Ritu Jain', fees: '₹850', yearsExp: 7, address: '1818, R Avenue, Srinagar' },
  { name: 'Dr. Abhishek Sen', fees: '₹900', yearsExp: 9, address: '1919, S Road, Dehradun' },
  { name: 'Dr. Shweta Rao', fees: '₹950', yearsExp: 13, address: '2020, T Street, Indore' }
];

const Physician = () => {
  return (
    <div className="p-4 md:p-6 lg:p-8">
      <h1 className="text-2xl font-bold mb-6">List of Physicians</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {physicians.map((doctor, index) => (
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

export default Physician;
