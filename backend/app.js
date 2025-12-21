const express = require('express');
const path = require('path');
const insertData = require("./mdb")
const app = express();
const PORT = 3000;


// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, '..',"frontend","public")));

// Route to send HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..',"frontend", 'public', 'index.html'), (err) => {
        if (err) {
            console.error('Error sending file:', err);
            res.status(500).send('Server Error');
        }
    });
});

app.post("/submit", async (req,res)=>{
    await insertData(req.body.name, req.body.contect, req.body.email, req.body.suggestion)
    res.sendFile(path.join(__dirname, '..',"frontend", 'public', 'submitted.html'), (err) => {
        if (err) {
            console.error('Error sending file:', err);
            res.status(500).send('Server Error');
        }
    });
})

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
