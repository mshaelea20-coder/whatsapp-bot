const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.json());

const idInstance = "7107596936";
const apiTokenInstance = "c6f1356321d246218d48cb7a0dc3bf3c20d34c5b75a34fe18a";

function normalizeText(text) {
  return text
    .toLowerCase()
    .replace(/[أإآ]/g, "ا")
    .replace(/ة/g, "ه")
    .replace(/ى/g, "ي")
    .replace(/[؟?!.,،]/g, "")
    .trim();
}

const intents = [
  {
   const intents = [
  {
    keywords: ["السلام", "سلام", "مرحبا", "اهلا", "هلا", "الو", "هاي"],
    reply: `هلا والله 🤍✨
حياك في متجر القراءة 📚

نقدّم قصص تعليمية مخصصة باسم الطفل تساعد على تنمية التفكير بطريقة ممتعة 🌱

تقدرين تسألين عن:
- كيف نشتغل
- الأسعار
- طريقة الطلب

وأجاوبك بكل حب 🤍`,
  },
  {
    keywords: ["مين انتم", "من انتم", "من انتو", "مين انتو", "تعريف", "ايش متجركم"],
    reply: `نحن متجر متخصص في القصص التعليمية للأطفال 📚✨
نصمم قصة باسم الطفل نفسه بحيث يعيش التجربة ويتعلم بطريقة ممتعة 🤍`,
  },
  {
    keywords: ["ايش تقدمون", "وش تقدمون", "ماذا تقدمون", "ايش عندكم", "وش عندكم", "خدماتكم", "منتجاتكم"],
    reply: `نقدّم قصص تعليمية مخصصة باسم الطفل 👧🧒
تكون القصة ممتعة وفيها محتوى يساعد الطفل على التفكير والتعلم بطريقة يحبها ✨`,
  },
  {
    keywords: ["العمر", "الاعمار", "الفئه العمريه", "لمن مناسب", "مين تستهدفون", "كم عمر", "يناسب اي عمر"],
    reply: `قصصنا مناسبة للأطفال من عمر 7 إلى 12 سنة 👧🧒
ومصممة بحيث تناسب مستوى فهمهم وتشد انتباههم 🤍`,
  },
  {
    keywords: ["كيف الطريقه", "كيف الطريقة", "كيف اطلب", "كيف اشتري", "ابي اشتري", "ابغى اشتري", "شراء", "اشتري", "طريقه الطلب", "طريقة الطلب", "الطلب", "اطلب", "كيف يتم الطلب"],
    reply: `بكل بساطة 🤍✨

1- تعبين نموذج الطلب
2- تكتبين اسم الطفل وبعض التفاصيل
3- نجهز لك القصة
4- نرسلها لك إلكترونيًا 📚

تقدرين تبدئين من هنا 👇
()`,
  },
  {
    keywords: ["السعر", "الاسعار", "الأسعار", "بكم", "كم السعر", "كم سعرها", "التكلفه", "التكلفة"],
    reply: `الأسعار والتفاصيل موجودة في رابط الطلب 🤍✨
( )`,
  },
  {
    keywords: ["رابط", "رابط الطلب", "ابي الرابط", "ابغى الرابط", "ارسلي الرابط", "ارسل الرابط", "النموذج", "استبيان"],
    reply: `تقدرين تطلبين من هنا بكل سهولة 👇✨
(https://forms.gle/Szz3aExew6x2sXfq6)

وإذا احتجتي مساعدة أنا معك 🤍`,
  },
];

function getReply(message) {
  const text = normalizeText(message);

  for (const intent of intents) {
    for (const keyword of intent.keywords) {
      if (text.includes(normalizeText(keyword))) {
        return intent.reply;
      }
    }
  }

  return `حياك 🤍✨
ممكن توضحي سؤالك أكثر؟ أو اختاري من هذي الخيارات:

- كيف الطريقة
- الأسعار
- الطلب

وأساعدك فورًا 🌱`;
}

app.post("/webhook", async (req, res) => {
  try {
    const body = req.body;
    const message = body?.messageData?.textMessageData?.textMessage || "";
    const chatId = body?.senderData?.chatId;

    if (!message || !chatId) {
      return res.sendStatus(200);
    }

    const reply = getReply(message);

    console.log("وارد:", message);
    console.log("رد:", reply);

    await axios.post(
      `https://7107.api.greenapi.com/waInstance${idInstance}/sendMessage/${apiTokenInstance}`,
      {
        chatId,
        message: reply,
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
