import IncomeSchema from "../models/incomeModel.js";

// Añadir ingreso
export const addIncome = async (req, res) => {
  const { title, amount, category, description, date } = req.body;

  try {
    // Validación de campos
    if (!title || !category || !description || !date) {
      return res.status(400).json({ message: 'All fields are required!' });
    }

    // Validación de amount
    if (typeof amount !== 'number') {
      return res.status(400).json({ message: 'Amount must be a number!' });
    }
    if (amount <= 0) {
      return res.status(400).json({ message: 'Amount must be a positive number!' });
    }

    const income = new IncomeSchema({
      title,
      amount,
      category,
      description,
      date,
      userId: req.user._id,
    });

    await income.save();
    res.status(201).json({ message: 'Income Added', income });
  } catch (error) {
    console.error('Error adding income:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Obtener todos los ingresos
export const getIncomes = async (req, res) => {
  try {
    const incomes = await IncomeSchema.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(incomes);
  } catch (error) {
    console.error('Error fetching incomes:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

export const deleteIncome = async (req, res) => {
  const { id } = req.params;
  try {
    const income = await IncomeSchema.findOne({ _id: id, userId: req.user._id });
    if (!income) {
      return res.status(404).json({ message: 'Income not found or not authorized' });
    }

    await IncomeSchema.findByIdAndDelete(id);
    res.status(200).json({ message: 'Income Deleted' });
  } catch (error) {
    console.error('Error deleting income:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};