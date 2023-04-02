"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const dataset = [];
app.post("/test", function (req, res) {
    const data = req.body;
    dataset.push(data);
    console.log("Hello");
    res.status(200).send("OK");
});
app.get("/", (req, res) => {
    res.json({
        data: dataset
    });
});
app.listen(5000, () => console.log("Listening on port 5000"));
