const { getInvoiceByNumber } = require('../services/serviceFusion');

const lookupInvoice = async (req, res) => {
    const { invoiceNumber, invoiceAmount } = req.body; // Extract data from the body

    try {
        // Retrieve the invoice by number from Service Fusion
        const invoice = await getInvoiceByNumber(invoiceNumber);

        // Compare the provided amount with the invoice's balance due
        if (parseFloat(invoice.balance_due) !== parseFloat(invoiceAmount)) {
            return res.status(400).send('Invoice amount does not match.');
        }

        // If invoice and amount match, return the invoice data
        res.json({
            message: 'Invoice validated ✅',
            invoice
        });

    } catch (error) {
        console.error(error);
        res.status(404).send('Invoice not found or error occurred.');
    }
};

module.exports = { lookupInvoice };
