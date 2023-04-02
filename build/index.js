"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const webhooks = {
    COMMIT: [],
    PUSH: [],
    MERGE: []
};
app.post("/api/webhook", (req, res) => {
    const { payloadurl, secret, events } = req.body;
    events.forEach((event) => {
        webhooks[event].push({
            payloadurl,
            secret
        });
    });
    res.json({ message: "Created webhook" });
});
app.post("/api/eventtry", (req, res) => {
    const { type, data } = req.body;
    setTimeout(() => {
        const list = webhooks[type];
        list.forEach((listItem) => __awaiter(void 0, void 0, void 0, function* () {
            const webhook = listItem;
            const { payloadurl, secret } = webhook;
            try {
                console.log(payloadurl, data);
                yield axios_1.default.post(payloadurl, data, {
                    headers: {
                        "x-secret": secret
                    }
                });
            }
            catch (err) { }
        }));
    }, 0);
});
app.listen(3000, () => {
    console.log("Listening on port 3000");
});
