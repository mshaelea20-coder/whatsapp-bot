const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());
console.log("NEW CODE IS RUNNING 12345");
const idInstance = process.env.GREEN_ID_INSTANCE;
const apiTokenInstance = process.env.GREEN_API_TOKEN;

async function sendWhatsApp(phone, message) {
  await axios.post(
   "https://7107.api.greenapi.com/waInstance" + idInstance + "/sendMessage/" + apiTokenInstance,
    {
      chatId: phone,
      message: message,
    }
  );
}

async function askClaude(userMessage) {
  const response = await axios.post(
    "https://api.anthropic.com/v1/messages",
    {
      model: "claude-opus-4-7",
      max_tokens: 300,
      messages: [
        {
          role: "user",
          content: userMessage,
        },
      ],
    },
    {
      headers: {
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
    }
  );

  return response.data.content[0].text;
}

app.post("/webhook", async (req, res) => {
  try {
    console.log("WEBHOOK HIT");
    console.log(JSON.stringify(req.body));

    const message =
      req.body?.messageData?.textMessageData?.textMessage ||
      req.body?.messageData?.extendedTextMessageData?.text ||
      req.body?.messageData?.quotedMessage?.textMessage;

    const sender = req.body?.senderData?.chatId;

    console.log("MESSAGE:", message);
    console.log("SENDER:", sender);

    if (!message || !sender) return res.sendStatus(200);

    const reply = await askClaude(message);
    console.log("CLAUDE REPLY:", reply);

    await sendWhatsApp(sender, reply);
    console.log("SENT TO WHATSAPP");

    res.sendStatus(200);
  } catch (error) {
    console.log("ERROR:", error.response?.data || error.message);
    res.sendStatus(500);
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
