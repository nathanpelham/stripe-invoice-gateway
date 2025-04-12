const { getInvoiceByNumber } = require('../services/serviceFusion');

const lookupInvoice = async (req, res) => {
  const { invoiceNumber, invoiceAmount } = req.body;

  try {
    const invoice = await getInvoiceByNumber(invoiceNumber);

    // Compare amount
    if (parseFloat(invoice.balance_due) !== parseFloat(invoiceAmount)) {
      return res.status(400).send('Invoice amount does not match.');
    }

    // For now, just return invoice data as JSON
    res.json({
      message: 'Invoice validated ✅',
      invoice
    });

  } catch (error) {
    console.error(error);
    res.status(404).send('Invoice not found or error occurred.');
  }
};

module.exports = {
  lookupInvoice
};
