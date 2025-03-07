const express = require('express');
const xlsx = require('xlsx');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 5000;
const fs = require('fs');

// Enable CORS
app.use(cors());

// Serve static files (if needed)
app.use(express.static(path.join(__dirname, 'private')));

// Endpoint to read the Excel file and send data
app.get('/api/data', (req, res) => {
    try {
        const filePath = path.join(__dirname, 'flood2024.xlsx');
        console.log('Checking file path:', filePath);

        if (!fs.existsSync(filePath)) {
            console.error('File not found:', filePath);
            return res.status(404).json({ error: 'Excel file not found' });
        }

        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames[0]; 
        const sheet = workbook.Sheets[sheetName];
        const jsonData = xlsx.utils.sheet_to_json(sheet);

        console.log('Data successfully read from Excel:', jsonData.slice(0, 5)); // Log first 5 rows
        res.json(jsonData);
    } catch (error) {
        console.error('Error reading Excel file:', error);
        res.status(500).json({ error: 'Failed to read Excel file' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});