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
    // User database
    const users = {
        user1: {
            name: "John Doe",
            location: "123 Elm Street, Springfield",
            email: "john.doe@example.com",
            phone: "123-456-7890",
        },
        user2: {
            name: "Jane Smith",
            location: "456 Maple Avenue, Shelbyville",
            email: "jane.smith@example.com",
            phone: "987-654-3210",
        },
        user3: {
            name: "Alice Johnson",
            location: "789 Oak Lane, Ogdenville",
            email: "alice.johnson@example.com",
            phone: "555-123-4567",
        },
        user4: {
            name: "Bob Brown",
            location: "101 Pine Road, North Haverbrook",
            email: "bob.brown@example.com",
            phone: "222-333-4444",
        },
        user5: {
            name: "Charlie Davis",
            location: "202 Birch Street, Brockway",
            email: "charlie.davis@example.com",
            phone: "111-222-3333",
        },
    };

    // If found your QR code
    function onScanSuccess(decodeText, decodeResult) {
        // Set the scanned QR code text to the input field
        document.getElementById("qr-scan").value = decodeText;

        // Match the scanned QR code with the user data
        const user = users[decodeText];
        if (user) {
            // Populate user details
            document.getElementById("user-name").textContent = `Name: ${user.name}`;
            document.getElementById("user-location").textContent = `Location: ${user.location}`;
            document.getElementById("user-email").textContent = `Email: ${user.email}`;
            document.getElementById("user-phone").textContent = `Phone: ${user.phone}`;

            // Show the user details section
            document.getElementById("user-details").style.display = "block";
        } else {
            // Hide user details section if no user is found
            document.getElementById("user-details").style.display = "none";
            alert("User not found.");
        }
    }

    // Initialize QR code scanner
    let htmlscanner = new Html5QrcodeScanner(
        "my-qr-reader",
        { fps: 10, qrbox: 250 }
    );
    htmlscanner.render(onScanSuccess);
});
