import React from 'react';
import IncomeForm from '../components/IncomeForm';
import IncomeList from '../components/IncomeList';
import './IncomePage.css'

const IncomePage = () => {
  return (
    <div className="income-container">
    <div className="ml-0 md:ml-64 p-4 md:p-6 w-full">
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
        <div className="flex-1">
          <IncomeForm />
        </div>
        <div className="flex-1">
          <IncomeList />
        </div>
      </div>
    </div>
    </div>
  );
};

export default IncomePage;
