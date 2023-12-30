// installmentController.js
const Installment = require("../models/installments");

const createInstallment = async (req, res) => {
  try {
    const { products, paymentMethod, totalPrice, installmentPlan, user } =
      req.body;

    // Assuming you have a user associated with the installment
    const userId = user; // Adjust this based on your authentication setup

    // Calculate installment amount based on the selected plan
    const installmentAmount = Math.trunc(
      totalPrice / parseInt(installmentPlan)
    );

    // Calculate due dates for installments
    const installmentDueDates = Array.from(
      { length: parseInt(installmentPlan) },
      (_, index) => {
        const dueDate = new Date();
        dueDate.setMonth(dueDate.getMonth() + index + 1); // Add months based on index
        return dueDate;
      }
    );

    const installments = installmentDueDates.map((dueDate) => ({
      amount: installmentAmount.toString(),
      dueDate,
    }));

    const installment = new Installment({
      user: userId,
      products,
      paymentMethod,
      totalPrice,
      installmentPlan,
      installments,
    });

    await installment.save();

    res.json({
      success: true,
      message: "Installment plan created successfully",
    });
  } catch (error) {
    console.error("Error creating installment plan", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getInstallmentById = async (req, res) => {
  try {
    const installmentId = req.params.id;
    console.log(installmentId);

    // Retrieve the installment plan from the database
    const installment = await Installment.findOne({
      user: installmentId,
    });

    if (!installment) {
      return res
        .status(404)
        .json({ success: false, message: "Installment plan not found" });
    }

    res.json({ success: true, installment });
  } catch (error) {
    console.error("Error fetching installment plan by ID", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// api that will set the installment as paid

const setInstallmentAsPaid = async (req, res) => {
  try {
    const installmentId = req.body.installmentId;

    // Retrieve the installment plan from the database based on installments.id
    const installment = await Installment.findOne({
      installments: { $elemMatch: { _id: installmentId } },
    });

    if (!installment) {
      return res
        .status(404)
        .json({ success: false, message: "Installment plan not found" });
    }

    // Find the index of the first unpaid installment
    const indexOfUnpaidInstallment = installment.installments.findIndex(
      (installment) => !installment.isPaid
    );

    // If all installments are paid, delete the record
    if (indexOfUnpaidInstallment === -1) {
      await Installment.findByIdAndDelete(installment._id);
      return res.json({ success: true, message: "Installment plan deleted" });
    }

    // Mark the next unpaid installment as paid
    installment.installments[indexOfUnpaidInstallment].isPaid = true;

    await installment.save();

    res.json({ success: true, message: "Installment plan updated" });
  } catch (error) {
    console.error("Error updating/installment plan by ID", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
//get api which will return code on the basis get the user and check if user already has installmentor not
const getInstallmentByUserId = async (req, res) => {
  try {
    const userId = req.params.id;

    // Retrieve the installment plan from the database
    const installment = await Installment.findOne({
      user: userId,
    });

    if (!installment) {
      return res
        .status(404)
        .json({ success: false, message: "Installment plan not found" });
    }

    res.json({ success: true, installment });
  } catch (error) {
    console.error("Error fetching installment plan by ID", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getTotalPendingPayments = async (req, res) => {
  try {
    // Retrieve all installment plans from the database
    const installments = await Installment.find({});

    if (!installments || installments.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No installment plans found" });
    }

    // Calculate total pending payments for all users
    const totalPendingPayments = installments.reduce((total, installment) => {
      installment.installments.forEach((payment) => {
        if (!payment.isPaid) {
          total.push({
            userId: installment.user,
            paymentId: payment._id, // You may want to include a unique identifier for each payment
            amount: parseInt(payment.amount),
          });
        }
      });
      return total;
    }, []);

    res.json({ success: true, totalPendingPayments });
  } catch (error) {
    console.error("Error fetching installment plans", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = {
  createInstallment,
  getInstallmentById,
  setInstallmentAsPaid,
  getInstallmentByUserId,
  getTotalPendingPayments,
};
