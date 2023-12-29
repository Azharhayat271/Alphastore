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

    // Retrieve the installment plan from the database on the basis of installments.id
    const installment = await Installment.findOne({
      installments: { $elemMatch: { _id: installmentId } },
    });
    
  

    if (!installment) {
      return res
        .status(404)
        .json({ success: false, message: "Installment plan not found" });
    }

    // Set the first installment as paid
    installment.installments[0].isPaid = true;

    await installment.save();

    res.json({ success: true, message: "Installment plan updated" });
  } catch (error) {
    console.error("Error fetching installment plan by ID", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


module.exports = { createInstallment, getInstallmentById ,setInstallmentAsPaid};
