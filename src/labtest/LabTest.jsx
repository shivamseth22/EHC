import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LabTest = () => {
  const navigate = useNavigate();

  const [selectedTests, setSelectedTests] = useState([]);

  const labTests = [
    { id: 1, name: 'Complete Blood Count (CBC)', cost: '₹500' },
    { id: 2, name: 'Liver Function Test (LFT)', cost: '₹700' },
    { id: 3, name: 'Kidney Function Test (KFT)', cost: '₹650' },
    { id: 4, name: 'Lipid Profile', cost: '₹600' },
    { id: 5, name: 'Thyroid Profile', cost: '₹550' },
    // Add more lab tests here
    { id: 6, name: 'Blood Glucose Fasting', cost: '₹400' },
    { id: 7, name: 'Urine Routine Examination', cost: '₹300' },
    { id: 8, name: 'Vitamin D Test', cost: '₹1200' },
    { id: 9, name: 'Electrolyte Panel', cost: '₹450' },
    { id: 10, name: 'Prostate-Specific Antigen (PSA)', cost: '₹900' },
    // More tests...
    { id: 100, name: 'D-Dimer Test', cost: '₹1100' },
  ];

  const addTest = (test) => {
    setSelectedTests([...selectedTests, test]);
  };

  const removeTest = (id) => {
    setSelectedTests(selectedTests.filter(test => test.id !== id));
  };

  const isTestSelected = (id) => {
    return selectedTests.some(test => test.id === id);
  };

  const handleCheckout = () => {
    navigate('/')
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <button
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
            onClick={() => navigate('/')}
          >
            Back
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={handleCheckout}
          >
            Checkout ({selectedTests.length} tests)
          </button>
        </div>

        <h1 className="text-2xl font-bold mb-6">Lab Tests</h1>

        <ul className="space-y-4">
          {labTests.map((test) => (
            <li key={test.id} className="bg-gray-50 p-4 rounded-lg shadow">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">{test.name}</span>
                <span className="text-blue-500">{test.cost}</span>
              </div>
              <div className="flex justify-end space-x-2">
                {!isTestSelected(test.id) ? (
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    onClick={() => addTest(test)}
                  >
                    Add
                  </button>
                ) : (
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    onClick={() => removeTest(test.id)}
                  >
                    Remove
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LabTest;
