import React from 'react';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';

const ExpensePage = () => {
  return (
    <div className="ml-64 p-6"> {/* Ajusta el margen izquierdo según el tamaño de tu sidebar */}
      <h1 className="text-2xl font-bold mb-6">Gastos</h1>
      <div className="flex space-x-8"> {/* Utiliza flexbox y añade margen entre los componentes */}
        <div className="flex-1"> {/* Esto permite que IncomeForm ocupe el espacio disponible */}
          <ExpenseForm />
        </div>
        <div className="flex-1"> {/* Esto permite que IncomeList ocupe el espacio disponible */}
          <ExpenseList />
        </div>
      </div>
    </div>
  );
};

export default ExpensePage;
