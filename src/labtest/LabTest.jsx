import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LabTest = () => {
  const navigate = useNavigate();

  const [selectedTests, setSelectedTests] = useState(() => {
    // Load initial state from local storage
    const savedTests = localStorage.getItem('selectedTests');
    return savedTests ? JSON.parse(savedTests) : [];
  });

  const labTests = [
    { id: 1, name: 'Complete Blood Count (CBC)', cost: 0.000001 },
    { id: 2, name: 'Liver Function Test (LFT)', cost: 0.000001 },
    { id: 3, name: 'Kidney Function Test (KFT)', cost: 0.000001 },
    { id: 4, name: 'Lipid Profile', cost: 0.000001 },
    { id: 5, name: 'Thyroid Profile', cost: 0.000001 },
    { id: 6, name: 'Blood Glucose Fasting', cost: 0.000001 },
    { id: 7, name: 'Urine Routine Examination', cost: 0.000001 },
    { id: 8, name: 'Vitamin D Test', cost: 0.000001 },
    { id: 9, name: 'Electrolyte Panel', cost: 0.000001 },
    { id: 10, name: 'Prostate-Specific Antigen (PSA)', cost: 0.000001 },
    { id: 11, name: 'Blood Urea Nitrogen (BUN)', cost: 0.000001 },
    { id: 12, name: 'Hemoglobin A1c (HbA1c)', cost: 0.000001 },
    { id: 13, name: 'C-Reactive Protein (CRP)', cost: 0.000001 },
    { id: 14, name: 'Calcium Test', cost: 0.000001 },
    { id: 15, name: 'Complete Metabolic Panel (CMP)', cost: 0.000001 },
    { id: 16, name: 'Ferritin Test', cost: 0.000001 },
    { id: 17, name: 'Magnesium Test', cost: 0.000001 },
    { id: 18, name: 'Blood Gas Test', cost: 0.000001 },
    { id: 19, name: 'Creatinine Test', cost: 0.000001 },
    { id: 20, name: 'D-Dimer Test', cost: 0.000001 },
  ];

  const addTest = (test) => {
    const updatedTests = [...selectedTests, test];
    setSelectedTests(updatedTests);
    localStorage.setItem('selectedTests', JSON.stringify(updatedTests));
    console.log('Selected Tests after adding:', updatedTests);
  };

  const removeTest = (id) => {
    const updatedTests = selectedTests.filter(test => test.id !== id);
    setSelectedTests(updatedTests);
    localStorage.setItem('selectedTests', JSON.stringify(updatedTests));
    console.log('Selected Tests after removing:', updatedTests);
  };

  const isTestSelected = (id) => {
    return selectedTests.some(test => test.id === id);
  };

  const handleCheckout = () => {
    navigate('/');
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
