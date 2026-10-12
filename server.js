
const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Backend Express berhasil berjalan!");
});

app.get("/posts", (req, res) => {
    res.json({ message: "Route GET /posts berhasil!" });
});

app.post("/posts", (req, res) => {
    res.json({
        message: "Route POST /posts berhasil!",
        data: req.body
    });
});

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});