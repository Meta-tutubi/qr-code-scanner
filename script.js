// script.js file

function domReady(fn) {
    if (
        document.readyState === "complete" ||
        document.readyState === "interactive"
    ) {
        setTimeout(fn, 1000);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}

domReady(function () {

    
    // If found your qr code
    function onScanSuccess(decodeText, decodeResult) {
    // Set the scanned QR code text to the input field
    document.getElementById("qr-scan").value = decodeText;
    }

    let htmlscanner = new Html5QrcodeScanner(
        "my-qr-reader",
        { fps: 10, qrbos: 250 }
    );
    htmlscanner.render(onScanSuccess);
});

// Sample user data (no database, just an array)
const users = [
    { id: 1, name: "John Doe", email: "john@example.com", qr_code_used: false },
    { id: 2, name: "Jane Smith", email: "jane@example.com", qr_code_used: false },
    { id: 3, name: "Alex Johnson", email: "alex@example.com", qr_code_used: false },
    { id: 4, name: "Emily Davis", email: "emily@example.com", qr_code_used: false },
    { id: 5, name: "Michael Brown", email: "michael@example.com", qr_code_used: false }
];

// Function to display the selected user based on QR code scan
function showUserInfo() {
    const qrScanInput = document.getElementById("qr-scan").value;
    const userInfoDiv = document.getElementById("user-info");
    const userId = qrScanInput.split(":")[1]; // Extract the user ID from input (e.g., user:1 -> 1)

    // Clear previous user info
    userInfoDiv.innerHTML = "";

    // Find the user with the corresponding ID
    const user = users.find(u => u.id == userId);

    if (user) {
        // If user is found, display the user's info and QR code
        userInfoDiv.innerHTML = `
            <h2>User Information</h2>
            <p><strong>Name:</strong> ${user.name}</p>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>QR Code Used:</strong> ${user.qr_code_used ? "Yes" : "No"}</p>
            <div id="qrcode-${user.id}"></div> <!-- QR code placeholder -->
        `;

        // Generate QR code for the user
        new QRCode(document.getElementById(`qrcode-${user.id}`), {
            text: `user:${user.id}`, // Unique identifier for each user
            width: 128,
            height: 128
        });

        // Show the user information div once it's populated
        userInfoDiv.style.display = "block"; // Make it visible
    } else {
        // If no matching user is found, display a message
        userInfoDiv.innerHTML = "<p>No user found. Please scan a valid QR code.</p>";
        userInfoDiv.style.display = "block"; // Make it visible
    }
}
