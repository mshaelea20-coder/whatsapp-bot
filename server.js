55321"}
```javascript
const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const idInstance = process.env.GREEN_ID_INSTANCE;
const apiTokenInstance = process.env.GREEN_API_TOKEN;

async function sendWhatsApp(phone, message) {
  await axios.post(
    https://7107.api.greenapi.com/waInstance${idInstance}/sendMessage/${apiTokenInstance},
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
      model: "claude-3-haiku-20240307",
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
    const message =
      req.body.messageData?.textMessageData?.textMessage;
    const sender = req.body.senderData?.chatId;

    if (!message) return res.sendStatus(200);

    const reply = await askClaude(message);

    await sendWhatsApp(sender, reply);

    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
