let rainfallData = []; // Variable to store the fetched data

// Function to fetch data from the backend
async function fetchData() {
    try {
        const response = await fetch('http://localhost:5000/api/data');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        rainfallData = await response.json();
        console.log('Data received:', rainfallData);  // Debugging line
        alert('Data loaded successfully!');
    } catch (error) {
        console.error('Error fetching data:', error.message);
        alert('Failed to load data. Check the console for details.');
    }
}

// Function to search data by date and/or location
function searchData() {
    const searchDate = document.getElementById('search-date').value;
    const searchLocation = document.getElementById('search-location').value.toLowerCase();
    const dataTableBody = document.querySelector('#data-table tbody');
    const dataTable = document.getElementById('data-table');

    // Clear existing rows
    dataTableBody.innerHTML = '';

    // Filter data based on search criteria
    const filteredData = rainfallData.filter(data => {
        const matchesDate = searchDate ? data.Date === searchDate : true;
        const matchesLocation = searchLocation ? data.Location.toLowerCase().includes(searchLocation) : true;
        return matchesDate && matchesLocation;
    });

    if (filteredData.length === 0) {
        dataTableBody.innerHTML = `<tr><td colspan="5">No data found for the selected criteria.</td></tr>`;
    } else {
        // Add new rows
        filteredData.forEach(row => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${row.Date}</td>
                <td>${row.Location}</td>
                <td>${row['Rain Precipitation (mm)']}</td>
                <td>${row['Runoff (mm)']}</td>
                <td>${row['Flood Risk']}</td>
            `;
            dataTableBody.appendChild(tr);
        });
    }

    // Show the table
    dataTable.classList.remove('hidden');
}

// Fetch data when the page loads
window.onload = fetchData;

