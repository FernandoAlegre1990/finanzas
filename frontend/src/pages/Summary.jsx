import React, { useState } from 'react';
import { useGetIncomesQuery } from '../redux/api/incomeApiSlice';
import { useGetExpensesQuery } from '../redux/api/expenseApiSlice';
import Chart from 'react-apexcharts';

const Summary = () => {
  const { data: incomes } = useGetIncomesQuery();
  const { data: expenses } = useGetExpensesQuery();

  const [goal, setGoal] = useState(0);

  const totalIncome = incomes?.reduce((acc, income) => acc + income.amount, 0) || 0;
  const totalExpense = expenses?.reduce((acc, expense) => acc + expense.amount, 0) || 0;
  const balance = totalIncome - totalExpense;

  const handleGoalChange = (e) => {
    setGoal(e.target.value);
  };

  const series = [totalIncome, totalExpense];
  const options = {
    chart: {
      type: 'pie',
    },
    labels: ['Ingresos', 'Gastos'],
    colors: ['#00E396', '#FF4560'],
  };

  return (
    <div className="ml-0 md:ml-64 p-4 md:p-6 w-full">
      <div className="w-full max-w-md lg:max-w-lg mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-center">Resumen Financiero</h2>
        <div className="mb-4 text-center">
          <h3 className="text-lg">Balance Total: ${balance}</h3>
          <h4>Ingresos Totales: ${totalIncome}</h4>
          <h4>Gastos Totales: ${totalExpense}</h4>
        </div>

        <div className="mb-4">
          <h4 className="text-center">Establecer Objetivo de Ahorro:</h4>
          <input
            type="number"
            value={goal}
            onChange={handleGoalChange}
            className="border rounded p-2 w-full text-center"
            placeholder="Ingrese su objetivo"
          />
          <h4 className="mt-2 text-center">
            Necesitas ahorrar: ${goal - balance < 0 ? 0 : goal - balance}
          </h4>
        </div>

        <div className="flex justify-center">
          <Chart options={options} series={series} type="pie" width="100%" />
        </div>
      </div>
    </div>
  );
};

export default Summary;
