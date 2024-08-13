import React from 'react';

const LabTest = () => {
  const labTests = [
    { id: 1, name: 'Complete Blood Count (CBC)' },
    { id: 2, name: 'Liver Function Test (LFT)' },
    { id: 3, name: 'Kidney Function Test (KFT)' },
    { id: 4, name: 'Lipid Profile' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300">
            Back
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            My Orders
          </button>
        </div>

        <h1 className="text-2xl font-bold mb-6">Lab Tests</h1>

        <ul className="space-y-4">
          {labTests.map((test) => (
            <li key={test.id} className="bg-gray-50 p-4 rounded-lg shadow hover:bg-blue-50 cursor-pointer">
              <div className="flex justify-between items-center">
                <span>{test.name}</span>
                <button className="text-blue-500 hover:underline">View Details</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LabTest;
