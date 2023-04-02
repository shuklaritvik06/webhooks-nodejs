"use strict";
const button = document.querySelector("#button");
button.addEventListener("click", () => {
    const payloadUrl = document.querySelector("#payload").value;
    const secret = document.querySelector("#secret").value;
    const events = [];
    const commitButton = document.querySelector("#commit");
    const pushButton = document.querySelector("#push");
    const mergeButton = document.querySelector("#merge");
    commitButton.checked ? events.push("COMMIT") : null;
    pushButton.checked ? events.push("PUSH") : null;
    mergeButton.checked ? events.push("MERGE") : null;
    SendRequest(payloadUrl, secret, events);
});
function SendRequest(payloadurl, secret, events) {
    fetch("http://localhost:3000/api/webhook", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            payloadurl,
            secret,
            events
        })
    }).then(() => {
        alert("Webhook Added!");
    });
}
const commitbtn = document.querySelector("#commitbtn");
const pushButton = document.querySelector("#pushbtn");
const mergeButton = document.querySelector("#mergebtn");
commitbtn.addEventListener("click", EmulateEvent);
pushButton.addEventListener("click", EmulateEvent);
mergeButton.addEventListener("click", EmulateEvent);
function EmulateEvent(e) {
    fetch("http://localhost:3000/api/eventtry", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            type: e.target.textContent,
            data: {
                message: "Hello KAISE HO?",
                data: "I am a BOSS!"
            }
        })
    })
        .then((res) => {
        return res.json();
    })
        .then((data) => {
        console.log(data);
    });
}
