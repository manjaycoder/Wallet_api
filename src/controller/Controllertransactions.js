import { sql } from "../config/db.js";

export async function getTransactionsByUserId(req, res) {
  try {
    const { userId } = req.params;
    const transactions = await sql`
        SELECT * FROM transactions WHERE user_id = ${userId} ORDER BY created_at DESC`;
    res.status(200).json(transactions);
  } catch (error) {
    console.log("GETTING THE TRANSACTION ", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
export async function CreateTransaction(req, res) {
  try {
    const { tittle, amount, category, user_id } = req.body;
    if (!tittle || !user_id || !category || amount === undefined) {
      return res.status(400).json({ message: "ALL FIELD ARE EMPTY" });
    }
    const transactions = await sql`
         INSERT INTO transactions(user_id,tittle,amount,category)
         VALUES (${user_id},${tittle},${amount},${category})
         RETURNING *
     `;
    res.status(201).json(transactions[0]);
  } catch (error) {
    console.log("ERROR CREATE THE TRANSACTION ", error);
    res.status(500).json({ message: "internal server error" });
  }
}
export async function DeleteTransaction(req, res) {
  try {
    const { id } = req.params;
    if (isNaN(parseInt(id))) {
      return res.status(400).json({ message: "Invalid transaction Id" });
    }
    const result = await sql`
     DELETE FROM transactions WHERE id=${id} RETURNING *`;
    if (result.length === 0) {
      return res.status(404).json({ message: "Transaction not found" });
    }
    res.status(200).json({ message: "TRANSACTION DELETED SUCCESSS" });
  } catch (error) {
    console.log("ERROR DELETING THE TRANSACTION", error);
    res.status(500).json({ message: "INTERNAL SERVER ERROR" });
  }
}

export async function getSummaryByUserId(req, res) {
  try {
    const { userId } = req.params;
    const balanceResult = await sql`
    SELECT COALESCE(SUM(amount),0)
    AS balance FROM transactions WHERE user_id = ${userId}`;
    const incomeResult = await sql`
    SELECT COALESCE(SUM(amount),0) AS income FROM transactions
    WHERE user_id=${userId} AND amount>0`;
    const expenseResult = await sql`
    SELECT COALESCE(SUM(amount),0) AS expense FROM transactions
    WHERE user_id=${userId} AND amount<0`;
    res.status(200).json({
      balance: balanceResult[0].balance,
      income: incomeResult[0].income,
      expense: expenseResult[0].expense,
    });
  } catch (error) {
    console.log("ERROR GETTING THE SUMMARY");
    res.status(500).json({ message: "INternal server error" });
  }
}
