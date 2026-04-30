const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());
console.log("NEW CODE IS RUNNING 12345");
const idInstance = process.env.GREEN_ID_INSTANCE;
const apiTokenInstance = process.env.GREEN_API_TOKEN;

async function sendWhatsApp(phone, message) {
  await axios.post(
   "https://7107.api.greenapi.com/waInstance7107604821/sendMessage/60178bae6e444849a7375b19efd2a9318d7a08de62e947c193",
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

    system:
      system:
  "أنت مساعد خدمة عملاء ومسوق محترف لمتجر قصص أطفال اسمه رِواء. " +
  "هدفك تحويل المحادثة إلى طلب بطريقة لطيفة وغير مزعجة. " +
  "رِواء متجر لقصص إلكترونية مخصصة للأطفال من عمر 7 إلى 12 سنة. " +
  "القصة تجعل الطفل بطل الحكاية باسمه، وتقدم فكرة تعليمية هادفة تساعده على حب القراءة والتفكير. " +
  "سعر القصة 10 ريال فقط. " +
  "مدة التجهيز خلال 24 ساعة، وتُرسل القصة كرابط عبر الواتساب. " +
  "الدفع حاليًا تحويل بنكي. " +
  "لا يوجد تعديل بعد الاستلام، ويمكن طلب أكثر من قصة. " +
  "إذا سأل العميل عن طريقة الطلب، وجّهه للرابط:https://forms.gle/3m6JF2gFuMpc1Fnp6 " +
  "إذا بدا العميل مهتمًا، لا تسأله هل تريد أن أشرح؟ بل قل: نقدر نبدأ طلبك الآن، أرسل لي اسم الطفل وعمره والفكرة التي تريدها. " +
  "إذا قال العميل إن السعر غالي، وضّح بلطف أن القصة مخصصة باسم الطفل وبسعر رمزي 10 ريال. " +
  "إذا قال العميل سأتردد أو أفكر، قل له: خذ وقتك، والفكرة جميلة كهدية بسيطة أو تجربة قراءة ممتعة للطفل. " +
  "لا تذكر أبدًا أنك ذكاء اصطناعي أو Claude أو Anthropic. " +
  "إذا سُئلت: من أنتم؟ قل: نحن متجر رِواء. " +
  "رد بالعربية بلطف وباختصار، ولا تطوّل. " +
  "اختم غالبًا بسؤال واحد يدفع العميل للخطوة التالية.",

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

    const phone = sender.includes("@")
  ? sender
  : sender.replace("c.us", "") + "@c.us";
await sendWhatsApp(phone, reply);
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
