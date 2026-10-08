import { LoanModel } from "../models/loanModel.js";

export const LoanController = {
  async getAll(req, res) {
    try {
      const { status, member_name } = req.query;
      const loans = await LoanModel.getAll({ status, member_name });
      res.status(200).json(loans);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async getById(req, res) {
    try {
      const loan = await LoanModel.getById(req.params.id);
      if (!loan) {
        return res.status(404).json({ error: "Data peminjaman tidak ditemukan" });
      }
      res.status(200).json(loan);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  },

  async create(req, res) {
    try {
      const { member_name, book_title, loan_date, return_date, status } = req.body;

      if (!member_name || !book_title) {
        return res.status(400).json({ error: "member_name dan book_title wajib diisi!" });
      }

      const payload = {
        member_name,
        book_title,
        loan_date: loan_date || new Date().toISOString().split("T")[0],
        return_date: return_date || null,
        status: status || "Dipinjam",
      };

      const newLoan = await LoanModel.create(payload);
      res.status(201).json(newLoan);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async update(req, res) {
    try {
      const updatedLoan = await LoanModel.update(req.params.id, req.body);
      res.status(200).json(updatedLoan);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async remove(req, res) {
    try {
      const result = await LoanModel.remove(req.params.id);
      res.status(200).json(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
};