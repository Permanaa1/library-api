import express from "express";
import dotenv from "dotenv";
import loanRoutes from "./routes/loanRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());

// Root test endpoint
app.get("/", (req, res) => {
  res.json({
    status: "Success",
    message: "Library Loan REST API is running",
  });
});

// Daftarkan rute loans (mendukung /loans dan /api/loans)
app.use("/loans", loanRoutes);
app.use("/api/loans", loanRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;