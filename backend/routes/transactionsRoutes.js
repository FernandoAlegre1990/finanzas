import { addExpense, getExpenses, deleteExpense } from '../controllers/expenseController.js';
import { addIncome, getIncomes, deleteIncome } from '../controllers/incomeController.js';
import express from 'express';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Rutas
router.post('/add-income', authenticate, addIncome);
router.get('/get-incomes', authenticate, getIncomes);
router.delete('/delete-income/:id', authenticate, deleteIncome);
router.post('/add-expense', authenticate, addExpense);
router.get('/get-expenses', authenticate, getExpenses);
router.delete('/delete-expense/:id', authenticate, deleteExpense);

// Exportación
export default router;