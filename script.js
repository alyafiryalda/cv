if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
        .then(() => console.log('Service Worker Registered'))
        .catch(error => console.error('Service Worker Registration Failed', error));
}
// Inisialisasi IndexedDB
const request = indexedDB.open("ContactDB", 1);
let db;

request.onupgradeneeded = (event) => {
    db = event.target.result;
    db.createObjectStore("contacts", { keyPath: "id", autoIncrement: true });
};

request.onsuccess = (event) => {
    db = event.target.result;
};

document.getElementById("contactForm").addEventListener("submit", (event) => {
    event.preventDefault();
    
    const contactData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value,
    };

    const transaction = db.transaction("contacts", "readwrite");
    const store = transaction.objectStore("contacts");
    store.add(contactData);

    transaction.oncomplete = () => {
        document.getElementById("responseMessage").innerText = "Message saved!";
        document.getElementById("contactForm").reset();
    };
    
    transaction.onerror = () => {
        document.getElementById("responseMessage").innerText = "Error saving message.";
    };
});
