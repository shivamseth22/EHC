import React from 'react';

const surgeons = [
  { name: 'Dr. Vikram Singh', fees: '₹1500', yearsExp: 20, address: 'A-101, Central Road, Delhi' },
  { name: 'Dr. Sunita Kapoor', fees: '₹1400', yearsExp: 18, address: 'B-202, Main Street, Mumbai' },
  { name: 'Dr. Anil Verma', fees: '₹1600', yearsExp: 22, address: 'C-303, Park Avenue, Bangalore' },
  { name: 'Dr. Shalini Gupta', fees: '₹1550', yearsExp: 15, address: 'D-404, Lake View, Hyderabad' },
  { name: 'Dr. Rajesh Kumar', fees: '₹1450', yearsExp: 19, address: 'E-505, Green Park, Pune' },
  { name: 'Dr. Pooja Rao', fees: '₹1500', yearsExp: 17, address: 'F-606, River Side, Chennai' },
  { name: 'Dr. Ajay Patel', fees: '₹1400', yearsExp: 16, address: 'G-707, Hill Road, Kolkata' },
  { name: 'Dr. Meena Desai', fees: '₹1600', yearsExp: 21, address: 'H-808, Ocean Drive, Ahmedabad' },
  { name: 'Dr. Sanjay Saxena', fees: '₹1550', yearsExp: 14, address: 'I-909, City Center, Jaipur' },
  { name: 'Dr. Nidhi Sharma', fees: '₹1450', yearsExp: 18, address: 'J-1010, Mall Road, Chandigarh' },
  { name: 'Dr. Amit Bhargava', fees: '₹1500', yearsExp: 20, address: 'K-1111, Market Street, Lucknow' },
  { name: 'Dr. Renu Joshi', fees: '₹1400', yearsExp: 19, address: 'L-1212, King’s Road, Bhopal' },
  { name: 'Dr. Manoj Nair', fees: '₹1600', yearsExp: 22, address: 'M-1313, Queen’s Avenue, Varanasi' },
  { name: 'Dr. Priya Sinha', fees: '₹1550', yearsExp: 17, address: 'N-1414, High Street, Thiruvananthapuram' },
  { name: 'Dr. Arun Mehta', fees: '₹1450', yearsExp: 15, address: 'O-1515, Diamond Road, Mysore' },
  { name: 'Dr. Seema Kulkarni', fees: '₹1500', yearsExp: 20, address: 'P-1616, Ruby Lane, Amritsar' },
  { name: 'Dr. Dinesh Reddy', fees: '₹1400', yearsExp: 18, address: 'Q-1717, Sapphire Street, Guwahati' },
  { name: 'Dr. Sneha Joshi', fees: '₹1600', yearsExp: 21, address: 'R-1818, Pearl Avenue, Srinagar' },
  { name: 'Dr. Vikash Mishra', fees: '₹1550', yearsExp: 19, address: 'S-1919, Emerald Road, Dehradun' },
  { name: 'Dr. Aarti Rao', fees: '₹1450', yearsExp: 17, address: 'T-2020, Opal Lane, Indore' }
];

const Sergon = () => {
  return (
    <div className="p-4 md:p-6 lg:p-8">
      <h1 className="text-2xl font-bold mb-6">List of Surgeons</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {surgeons.map((doctor, index) => (
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

export default Sergon;
