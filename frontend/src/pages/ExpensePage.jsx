import React from 'react';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';

const ExpensePage = () => {
  return (
    <div className="ml-0 md:ml-64 p-4 md:p-6 w-full">
      <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Gastos</h1>
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
        <div className="flex-1">
          <ExpenseForm />
        </div>
        <div className="flex-1">
          <ExpenseList />
        </div>
      </div>
    </div>
  );
};

export default ExpensePage;
