// Sample user data (no database, just an array)
const users = [
    { id: 1, name: "John Michael Diaz", email: "john@example.com", contact: "09111111111", qr_code_used: false },
    { id: 2, name: "Janneth Villegas", email: "jane@example.com", contact: "09222222222", qr_code_used: false },
    { id: 3, name: "Alex Tamayo", email: "alex@example.com", contact: "09333333333", qr_code_used: false },
    { id: 4, name: "Emily Riverp", email: "emily@example.com", contact: "09444444444", qr_code_used: false },
    { id: 5, name: "Michael Jackson", email: "michael@example.com", contact: "555555555", qr_code_used: false }
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
            <p><strong>Contact:</strong> ${user.contact}</p>
            <div id="qrcode-${user.id}"></div> <!-- QR code placeholder -->
        `;

     

        // Show the user information div once it's populated
        userInfoDiv.style.display = "block"; // Make it visible
    } else {
        // If no matching user is found, display a message
        userInfoDiv.innerHTML = "<p>No user found. Please scan a valid QR code.</p>";
        userInfoDiv.style.display = "block"; // Make it visible
    }
}


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

        // Call showUserInfo explicitly to display the user information
        showUserInfo();
    }

    let htmlscanner = new Html5QrcodeScanner(
        "my-qr-reader",
        { fps: 10, qrbox: 250 }
    );
    htmlscanner.render(onScanSuccess);

});
