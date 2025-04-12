const axios = require('axios');

// Base URL for Service Fusion API
const BASE_URL = 'https://api.servicefusion.com/v1'; // Adjust if necessary

// Function to get an invoice by its number
const getInvoiceByNumber = async (invoiceNumber) => {
    try {
        // Send a GET request to the Service Fusion API to retrieve the invoice
        const response = await axios.get(`${BASE_URL}/invoices?invoice_number=${invoiceNumber}`, {
            headers: {
                'X-AUTH-TOKEN': process.env.SERVICE_FUSION_API_KEY // Ensure this key is in your .env file
            }
        });

        // Check if a valid invoice was found
        if (response.data && response.data.length > 0) {
            return response.data[0]; // Return the first matching invoice
        } else {
            throw new Error('Invoice not found');
        }
    } catch (error) {
        console.error('Error fetching invoice from Service Fusion:', error);
        throw new Error('Failed to retrieve invoice');
    }
};

module.exports = {
    getInvoiceByNumber
};
