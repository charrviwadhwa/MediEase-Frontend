// Get references to the input field and suggestions container
const searchInput = document.getElementById('search-input');
const suggestionsBox = document.getElementById('suggestions');

// Mock list of medicines for demonstration purposes

// async function getMedicines() {
//     const data = {
//         request_type: 'get_all_med',

//     };

//     // Sending POST request to backend
//     const response = await fetch('http://127.0.0.1:8000/api/medicine', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//     });

//     const result = await response.json();
//     return result.medicines;
// }
// 
async function getMedicines() {
    const data = { request_type: "get_all_med" };

    try {
        const response = await fetch("hhttps://mediease-backend.onrender.com/api/medicine", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        console.log("Medicines fetched: ", result);  // ✅ Debugging step
        return result.medicines || [];  // ✅ Ensure it returns an array
    } catch (error) {
        console.error("Error fetching medicines:", error);
        return [];
    }
}



// async function main() {


//     const medicines = await getMedicines();

//     // Function to display suggestions based on input
//     searchInput.addEventListener('input', () => {
//         const input = searchInput.value.toLowerCase();
//         suggestionsBox.innerHTML = ''; // Clear previous suggestions

//         if (input) {
//             // Filter medicines based on the input text
//             const filteredMedicines = medicines.filter(medicine =>
//                 medicine.toLowerCase().includes(input)
//             );

//             // Show filtered medicines as suggestions
//             filteredMedicines.forEach(medicine => {
//                 const suggestionItem = document.createElement('div');
//                 suggestionItem.textContent = medicine;

//                 // When a suggestion is clicked, navigate to the medicine's page
//                 suggestionItem.addEventListener('click', () => {
//                     window.location.href = `/NearbyShops.html?medicine_name=${encodeURIComponent(medicine)}`;
//                 });

//                 suggestionsBox.appendChild(suggestionItem);
//             });
//         }
//     });
// }
async function main() {
    const medicines = await getMedicines();

    if (medicines.length === 0) {
        console.error("No medicines available");
        return;
    }

    searchInput.addEventListener('input', () => {
        const input = searchInput.value.toLowerCase();
        suggestionsBox.innerHTML = ''; // Clear previous suggestions

        if (input) {
            // Filter medicines based on the input text
            const filteredMedicines = medicines.filter(medicine =>
                medicine.name.toLowerCase().includes(input)
            );

            // Show filtered medicines as suggestions
            filteredMedicines.forEach(medicine => {
                const suggestionItem = document.createElement('div');
                suggestionItem.textContent = medicine.name;

                // When a suggestion is clicked, navigate to the medicine's page

                console.log("Selected medicine:", medicine);

                suggestionItem.addEventListener('click', () => {
                    if (typeof medicine === "object" && medicine.name) {
                        window.location.href = `/frontend/NearbyShops.html?medicine_name=${encodeURIComponent(medicine.name)}`;

                    } else {
                        console.error("Invalid medicine data:", medicine);
                    }
                });
                

                suggestionsBox.appendChild(suggestionItem);
            });
        }
    });
}


document.addEventListener('DOMContentLoaded', main);