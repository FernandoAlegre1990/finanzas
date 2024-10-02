import ExpenseSchema from "../models/expenseModel.js";

export const addExpense = async (req, res) => {
  const { title, amount, category, description, date } = req.body;

  try {
    // Validaciones
    if (!title || !category || !description || !date) {
      return res.status(400).json({ message: 'All fields are required!' });
    }
    if (amount <= 0 || typeof amount !== 'number') {
      return res.status(400).json({ message: 'Amount must be a positive number!' });
    }

    const expense = new ExpenseSchema({
      title,
      amount,
      category,
      description,
      date,
      userId: req.user._id,
    });

    await expense.save();
    res.status(201).json({ message: 'Expense Added', expense });
  } catch (error) {
    console.error('Error adding expense:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

export const getExpenses = async (req, res) => {
  try {
    const expenses = await ExpenseSchema.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(expenses);
  } catch (error) {
    console.error('Error fetching expenses:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

export const deleteExpense = async (req, res) => {
  const { id } = req.params;
  try {
    const expense = await ExpenseSchema.findOne({ _id: id, userId: req.user._id });
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found or not authorized' });
    }
    await ExpenseSchema.findByIdAndDelete(id);
    res.status(200).json({ message: 'Expense Deleted' });
  } catch (error) {
    console.error('Error deleting expense:', error);
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Invalid expense ID format' });
    }
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};