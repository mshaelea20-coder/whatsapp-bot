const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

// بيانات Green API
const idInstance = "const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

// بيانات Green API
const idInstance = "const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

// بيانات Green API
const idInstance = "7107596936";
const apiTokenInstance = "c6f1356321d246218d48cb7a0dc3bf3c20d34c5b75a34fe18a";

// مفتاح Claude (من Render)
const CLAUDE_API_KEY = process.env.CLAUDE_API_KEY;

// استدعاء Claude
async function askClaude(message) {
  const prompt = `
أنت مساعد متجر كتب أطفال.

افهم رسالة العميل ورد حسب التالي:

- إذا مجرد سلام → رد بشكل لطيف
- إذا يسأل عن الطلب → طمّنه واسأله عن التفاصيل
- إذا يطلب كتاب → أرسل له هذا النموذج:

✨ عشان نصمم لك قصة خاصة:
https://forms.gle/Sez3aExew6x2sXfq6

خلك مختصر وودود
`;

  const response = await axios.post(
    "https://api.anthropic.com/v1/messages",
    {
      model: "claude-3-haiku-20240307",
      max_tokens: 300,
      messages: [
        {
          role: "user",
          content: prompt + "\n\nرسالة العميل: " + message,
        },
      ],
    },
    {
      headers: {
        "x-api-key": CLAUDE_API_KEY,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
    }
  );

  return response.data.content[0].text;
}

// إرسال واتساب
async function sendWhatsApp(phone, message) {
  const url = `https://7107.api.greenapi.com/waInstance${idInstance}/sendMessage/${apiTokenInstance}`;

  await axios.post(url, {
    chatId: phone,
    message: message,
  });
}

// استقبال الرسائل من واتساب
app.post("/webhook", async (req, res) => {
  try {
    const message = req.body.messageData?.textMessageData?.textMessage;
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

// تشغيل السيرفر
app.listen(3000, () => {
  console.log("Server running on port 3000");
});";
const apiTokenInstance = "حطي_التوكن_هنا";

// مفتاح Claude (من Render)
const CLAUDE_API_KEY = process.env.CLAUDE_API_KEY;

// استدعاء Claude
async function askClaude(message) {
  const prompt = `
أنت مساعد متجر كتب أطفال.

افهم رسالة العميل ورد حسب التالي:

- إذا مجرد سلام → رد بشكل لطيف
- إذا يسأل عن الطلب → طمّنه واسأله عن التفاصيل
- إذا يطلب كتاب → أرسل له هذا النموذج:

✨ عشان نصمم لك قصة خاصة:
https://forms.gle/Sez3aExew6x2sXfq6

خلك مختصر وودود
`;

  const response = await axios.post(
    "https://api.anthropic.com/v1/messages",
    {
      model: "claude-3-haiku-20240307",
      max_tokens: 300,
      messages: [
        {
          role: "user",
          content: prompt + "\n\nرسالة العميل: " + message,
        },
      ],
    },
    {
      headers: {
        "x-api-key": CLAUDE_API_KEY,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
    }
  );

  return response.data.content[0].text;
}

// إرسال واتساب
async function sendWhatsApp(phone, message) {
  const url = `https://7107.api.greenapi.com/waInstance${idInstance}/sendMessage/${apiTokenInstance}`;

  await axios.post(url, {
    chatId: phone,
    message: message,
  });
}

// استقبال الرسائل من واتساب
app.post("/webhook", async (req, res) => {
  try {
    const message = req.body.messageData?.textMessageData?.textMessage;
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

// تشغيل السيرفر
app.listen(3000, () => {
  console.log("Server running on port 3000");
});";
const apiTokenInstance = "حطي_التوكن_هنا";

// مفتاح Claude (من Render)
const CLAUDE_API_KEY = process.env.CLAUDE_API_KEY;

// استدعاء Claude
async function askClaude(message) {
  const prompt = `
أنت مساعد متجر كتب أطفال.

افهم رسالة العميل ورد حسب التالي:

- إذا مجرد سلام → رد بشكل لطيف
- إذا يسأل عن الطلب → طمّنه واسأله عن التفاصيل
- إذا يطلب كتاب → أرسل له هذا النموذج:

✨ عشان نصمم لك قصة خاصة:
https://forms.gle/Sez3aExew6x2sXfq6

خلك مختصر وودود
`;

  const response = await axios.post(
    "https://api.anthropic.com/v1/messages",
    {
      model: "claude-3-haiku-20240307",
      max_tokens: 300,
      messages: [
        {
          role: "user",
          content: prompt + "\n\nرسالة العميل: " + message,
        },
      ],
    },
    {
      headers: {
        "x-api-key": CLAUDE_API_KEY,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
    }
  );

  return response.data.content[0].text;
}

// إرسال واتساب
async function sendWhatsApp(phone, message) {
  const url = `https://7107.api.greenapi.com/waInstance${idInstance}/sendMessage/${apiTokenInstance}`;

  await axios.post(url, {
    chatId: phone,
    message: message,
  });
}

// استقبال الرسائل من واتساب
app.post("/webhook", async (req, res) => {
  try {
    const message = req.body.messageData?.textMessageData?.textMessage;
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

// تشغيل السيرفر
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
