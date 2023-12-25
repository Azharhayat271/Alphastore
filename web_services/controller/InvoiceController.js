const PDFDocument = require("pdfkit");

// Function to generate the PDF invoice and send it as a response
const generateInvoice = (order, res) => {
  // Create a new PDF document
  const doc = new PDFDocument();

  // Set the response headers for PDF
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename="invoice_${order._id}.pdf"`
  );

  // Pipe the PDF document output to the response
  doc.pipe(res);
  // add space betten logo and text

  // Add content to the PDF document
  doc.fontSize(20).text("Invoice", { underline: true, align: "center" });
  doc.moveDown(2);

  doc.image("logo.png", 50, 50, { width: 100 });
  doc.fontSize(14).text("Alpha Store", { align: "center" });
  doc.text("--------------------------------------------");

  doc.fontSize(14).text(`Order ID: ${order._id}`);
  doc.fontSize(14).text(`Customer: ${order.shippingAddress.customer_name}`);
  doc.fontSize(20).text("Address", { underline: true, align: "center" });
  doc.fontSize(14).text(`Street: ${order.shippingAddress.street1}`);
  doc.fontSize(14).text(`City: ${order.shippingAddress.city}`);
  doc.fontSize(14).text(`State: ${order.shippingAddress.state}`);
  doc.fontSize(14).text(`Zip: ${order.shippingAddress.zip}`);

  doc.text("--------------------------------------------");
  doc.fontSize(16).text("Order Details", { underline: true });

  // Loop through the order items and add them to the invoice
  order.orderItems.map((items) => {
    doc.fontSize(14).text(`Name: ${items.name}`);
    doc.fontSize(14).text(`Price: ${items.price}`);
    doc.fontSize(14).text(`Quantity: ${items.qty}`);
  });

  doc.text("--------------------------------------------");
  doc.fontSize(16).text(`Total: $${order.totalPrice}`);

  doc.text("--------------------------------------------");
  doc.fontSize(16).text(`Thanks for Shoping and the Alpha Store!`, { underline: true, align: "center" });

  // Finalize the PDF document
  doc.end();
};

module.exports = generateInvoice;
