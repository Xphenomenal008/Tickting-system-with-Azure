document.getElementById("supportForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const ticketData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        category: document.getElementById("category").value,
        description: document.getElementById("description").value
    };
     console.log(ticketData)
    const response = await fetch("http://localhost:5000/submit-ticket", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(ticketData)
    });

    const result = await response.json();
    document.getElementById("responseMessage").textContent = result.message;
});
