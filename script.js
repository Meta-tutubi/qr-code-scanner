// script.js file

// Sample user data (no database, just an array)
const users = [
    { id: 1, name: "John Michael Diaz", email: "john@example.com" },
    { id: 2, name: "Janneth Villegas", email: "jane@example.com" },
    { id: 3, name: "Alex Tamayo", email: "alex@example.com" },
    { id: 4, name: "Emily Riverp", email: "emily@example.com" },
    { id: 5, name: "Michael Jackson", email: "michael@example.com" }
];

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
