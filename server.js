const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const idInstance = "7107596936";
const apiTokenInstance = c6f1356321d246218d48cb7a0dc3bf3c20d34c5b75a34fe18a"";

function normalizeText(text) {
  return (text || "").toLowerCase().trim();
}

async function askClaude(message) {
  const response = await axios.post(
    "https://api.anthropic.com/v1/messages",
    {
      model: "claude-haiku-4-5",
      max_tokens: 250,
      messages: [
        {
          role: "user",
          content: `
أنتِ موظفة خدمة عملاء لمتجر قصص أطفال إلكترونية.

ردّي باللهجة السعودية، بأسلوب ودود ومختصر وواضح.

معلومات المتجر:
- نقدم قصص إلكترونية مخصصة باسم الطفل.
- القصة تساعد على تنمية التفكير بطريقة ممتعة.
- العميل يشتري ثم يعبئ نموذج بيانات الطفل.
- إذا سأل عن طريقة الطلب: اشرحي له أن يشتري ثم يعبئ النموذج.
- إذا قال إن الكتاب ما وصله: اطلبي منه رقم الجوال أو رقم الطلب.
- إذا سأل عن الأسعار: قولي له إن التفاصيل موجودة في رابط الطلب.
- إذا كان السؤال غير واضح: اطلبي منه يوضح سؤاله بلطف.

رسالة العميل:
${message}
`
        }
      ]
    },
    {
      headers: {
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json"
      }
    }
  );

  return response.data.content[0].text;
}

async function sendWhatsApp(chatId, message) {
  await axios.post(
    `https://7107.api.greenapi.com/waInstance${idInstance}/sendMessage/${apiTokenInstance}`,
    {
      chatId: chatId,
      message: message
    }
  );
}

app.post("/webhook", async (req, res) => {
  try {
    const body = req.body;

    const message =
      body?.messageData?.textMessageData?.textMessage || "";

    const chatId = body?.senderData?.chatId;

    if (!message || !chatId) {
      return res.sendStatus(200);
    }

    console.log("Incoming:", message);

    const reply = await askClaude(normalizeText(message));

    console.log("Reply:", reply);

    await sendWhatsApp(chatId, reply);

    res.sendStatus(200);
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    res.sendStatus(500);
  }
});

app.get("/", (req, res) => {
  res.send("Bot is running");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
