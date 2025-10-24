import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const prisma = new PrismaClient();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const EXPENSES_FILE_PATH = path.join(__dirname, '../data/expenses.json');
const EXPENSES_INIT_FILE_PATH = path.join(__dirname, '../data/expenses.init.json');

async function getAllExpenses() {
  const data = await prisma.expense.findMany();
  return data;
}

async function addExpense(expense) {
  const newExpense = await prisma.expense.create({
    data: {
      description: expense.description,
      payer: expense.payer,
      amount: expense.amount
    }
  });
  return newExpense;
}

function resetExpenses() {
  const initData = fs.readFileSync(EXPENSES_INIT_FILE_PATH, 'utf8');
  fs.writeFileSync(EXPENSES_FILE_PATH, initData);
  return JSON.parse(initData);
}

export { getAllExpenses, addExpense, resetExpenses };