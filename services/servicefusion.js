const axios = require('axios');

const BASE_URL = 'https://api.servicefusion.com/v1'; // Adjust if different

const getInvoiceByNumber = async (invoiceNumber) => {
  const response = await axios.get(`${BASE_URL}/invoices?invoice_number=${invoiceNumber}`, {
    headers: {
      'X-AUTH-TOKEN': process.env.SERVICE_FUSION_API_KEY
    }
  });

  if (response.data && response.data.length > 0) {
    return response.data[0]; // Return first matching invoice
  } else {
    throw new Error('Invoice not found');
  }
};

module.exports = {
  getInvoiceByNumber
};
