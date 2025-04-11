require('dotenv').config(); // at the top

const express = require("express");
const cors = require("cors");
const axios = require("axios");


const app = express();
app.use(cors());
app.use(express.json());  // Use express.json() instead of body-parser.json()
app.use(express.urlencoded({ extended: true }));  // To handle form data

const AZURE_LOGIC_APP_URL = process.env.ID;
app.post("/submit-ticket", async (req, res) => {
    try {
        console.log("Received request body:", req.body);  // Debugging step

        const { name, email, category, description } = req.body;
        if (!name || !email || !category || !description) {
            return res.status(400).json({ message: "All fields are required!" });
        }

        const ticketID = `TICKET-${Date.now()}`;

        // Send data to Azure Logic Apps
        await axios.post(AZURE_LOGIC_APP_URL, {
            ticketID,
            name,
            email,
            category,
            description
        });

        res.json({ message: "Ticket submitted successfully!" });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Error submitting ticket" });
    }
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
