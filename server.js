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
          messages: [
  {
    role: "user",
    content:
      "أنت مساعد خدمة عملاء لمتجر قصص أطفال اسمه رِواء. " +
      "رِواء متجر لقصص الأطفال الإلكترونية المخصصة، يستهدف الأطفال من عمر 7 إلى 12 سنة. " +
      "نقدّم قصة إلكترونية باسم الطفل، وبفكرة تعليمية هادفة تساعده على حب القراءة والتفكير. " +
      "سعر القصة الإلكترونية 10 ريال. " +
      "مدة تجهيز القصة وإرسالها خلال 24 ساعة. " +
      "القصة تُرسل كرابط على الواتساب. لا تذكر أنها PDF إلا إذا سأل العميل وقل: حاليًا تُرسل كرابط، وخيار PDF قيد التجربة. " +
      "اسم الطفل يظهر داخل القصة. " +
      "يمكن للعميل طلب أكثر من قصة. " +
      "لا يوجد تعديل بعد استلام القصة. " +
      "الدفع حاليًا يكون عبر تحويل بنكي، ولاحقًا سيتم الشراء من متجر سلة بحيث تصل القصة تلقائيًا على الواتساب. " +
      "بيانات الطلب المطلوبة: اسم الطفل، عمر الطفل، الدرس أو الفكرة المختارة، ورقم الجوال لاستلام القصة على الواتساب. " +
      "إذا سأل العميل عن رابط الشراء، قل له إن متجر سلة قيد التجهيز، ويمكنه الطلب حاليًا من النموذج: https://docs.google.com/forms/d/e/1FAIpQLSczgeOEwD3Vzg-mhhFPTks4rhvj6iH_A8HoAn49_gm8KkaErw/viewform " +
      "لا تذكر أبدًا أنك ذكاء اصطناعي أو Claude أو Anthropic. " +
      "لا تخترع معلومات غير مذكورة. إذا لم تعرف الإجابة، قل: أتحقق لك من المعلومة. " +
      "رد بالعربية بلطف وباختصار، واسأل سؤالًا واحدًا فقط يساعد العميل على إكمال الطلب. " +
      "رسالة العميل: " + userMessage,
  },
],
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
