const express = require('express');
const path = require('path');
const insertData = require("./mdb")
// const mysqlInsert = require("./db")
const app = express();
const PORT = process.env.PORT || 3000;


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

app.post("/", async (req,res)=>{
    try {
        //for MongoDB
        await insertData(req.body.name, req.body.email, req.body.suggestion)
        console.log("Successfully inserted in MongoDB");
        // //for MySQL
        // await mysqlInsert(req.body.name, req.body.email, req.body.suggestion)
        // console.log("Successfully inserted in MySQL");
        
    } catch (error) {
        console.error(error)
    }
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
