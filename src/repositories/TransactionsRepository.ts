import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const totalIncome = this.getTotalIncome();
    const totalOutcome = this.getTotalOutcome();
    const total = totalIncome - totalOutcome;

    return {
      income: totalIncome,
      outcome: totalOutcome,
      total,
    };
  }

  public getTotalIncome(): number {
    return this.all()
      .filter(transaction => transaction.type === 'income')
      .reduce((total, next) => total + next.value, 0);
  }

  public getTotalOutcome(): number {
    return this.all()
      .filter(transaction => transaction.type === 'outcome')
      .reduce((total, next) => total + next.value, 0);
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
