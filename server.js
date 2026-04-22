const express = require("express");
const app = express();

app.use(express.json());

const replies = {
  "من انتم": "نحن متجر القراءة 📚 نقدم قصص إلكترونية مخصصة للأطفال بطريقة ممتعة 🤍",
  "ايش تقدمون": "نقدم قصص تعليمية مخصصة باسم الطفل تساعد على تنمية التفكير ✨",
  "العمر": "قصصنا مناسبة للأطفال من عمر 7 إلى 12 سنة 👧🧑",
  "الطلب": "تقدرين تطلبين من هنا 👇\n(حطي رابط الاستبيان هنا)",
  "السعر": "حالياً التفاصيل متوفرة داخل النموذج 🤍",
};

app.post("/", (req, res) => {
  const message = req.body.message?.text?.toLowerCase() || "";

  let reply = "حياك 🤍 ممكن توضحي سؤالك أكثر؟";

  for (let key in replies) {
    if (message.includes(key)) {
      reply = replies[key];
      break;
    }
  }

  console.log("Incoming:", message);
  console.log("Reply:", reply);

  res.json({
    reply: reply,
  });
});

app.get("/", (req, res) => {
  res.send("Bot is running");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
