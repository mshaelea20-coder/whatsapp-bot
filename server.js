const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.json());

const idInstance = "7107596936";
const apiTokenInstance = "6c172bfa0f6f400abc12afbe15142da9b93fc1fd25054f3994";

const replies = {
  "من انتم": "نحن متجر القراءة 📚 نقدم قصص إلكترونية مخصصة للأطفال بطريقة ممتعة 🤍",
  "ايش تقدمون": "نقدم قصصًا تعليمية مخصصة باسم الطفل تساعد على تنمية التفكير ✨",
  "العمر": "قصصنا مناسبة للأطفال من عمر 7 إلى 12 سنة 👧🧒",
  "الطلب": "تقدرين تطلبين من هنا 👇\n(حطي رابط الطلب هنا)",
  "السعر": "التفاصيل موجودة داخل رابط الطلب 🤍"
};

app.post("/webhook", async (req, res) => {
  try {
    const body = req.body;

    const message =
      body?.messageData?.textMessageData?.textMessage || "";

    const chatId = body?.senderData?.chatId;

    if (!message || !chatId) {
      return res.sendStatus(200);
    }

    let reply = "حياك 🤍 ممكن توضحين سؤالك أكثر؟";

    for (let key in replies) {
      if (message.toLowerCase().includes(key)) {
        reply = replies[key];
        break;
      }
    }

    console.log("وارد:", message);
    console.log("رد:", reply);

    await axios.post(
      `https://7107.api.greenapi.com/waInstance${idInstance}/sendMessage/${apiTokenInstance}`,
      {
        chatId: chatId,
        message: reply
      }
    );

    res.sendStatus(200);
  } catch (error) {
    console.error("خطأ:", error.response?.data || error.message);
    res.sendStatus(500);
  }
});

app.get("/", (req, res) => {
  res.send("Bot is running");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
