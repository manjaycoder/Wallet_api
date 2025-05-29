import express from "express";

import {
  CreateTransaction,
  DeleteTransaction,
  getSummaryByUserId,
  getTransactionsByUserId,
} from "../controller/Controllertransactions.js";
const router = express.Router();

router.post("/", CreateTransaction);

router.get("/:userId", getTransactionsByUserId);

router.delete("/:id", DeleteTransaction);
router.get("/summary/:userId", getSummaryByUserId);
export default router;
