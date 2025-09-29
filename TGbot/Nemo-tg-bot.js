const { Bot, session } = require("grammy");

require("dotenv").config();

const bot = new Bot(process.env.BOT_TOKEN);

function initial() {
  return {
    step: 0,
    day: "",
    dayNumber: "",
    tasks: "",
    total: "",
    messages: [],
  };
}

bot.use(session({ initial }));

bot.command("start", (ctx) => {
  ctx.reply(
    "Привет немощь!\nнапиши /day и я тебе соберу твою дрисню в одну кучу"
  );
});

bot.command("day", async (ctx) => {
  ctx.session = initial();
  ctx.session.step = 1;

  const msg = await ctx.reply("Напиши число и месяц");
  ctx.session.messages.push(msg.message_id);
});

bot.on("message", async (ctx) => {
  const msg = ctx.message.text;
  ctx.session.messages.push(ctx.message.message_id);

  if (ctx.session.step === 1) {
    ctx.session.day = msg;
    ctx.session.step = 2;

    const question = await ctx.reply("Теперь напиши номер дня");
    ctx.session.messages.push(question.message_id);
    return;
  }

  if (ctx.session.step === 2) {
    ctx.session.dayNumber = msg;
    ctx.session.step = 3;

    const question = await ctx.reply("Бездарь, что ты за день хоть успел?");
    ctx.session.messages.push(question.message_id);
    return;
  }

  if (ctx.session.step === 3) {
    ctx.session.tasks = msg;
    ctx.session.step = 4;

    const question = await ctx.reply("И сколько мучался часов?");
    ctx.session.messages.push(question.message_id);
    return;
  }

  if (ctx.session.step === 4) {
    ctx.session.total = msg;
    ctx.session.step = 0;

    const year = new Date().getFullYear();

    const finalMessage = `
<b>${ctx.session.day} ${year} | ДЕНЬ ${ctx.session.dayNumber}</b>

${ctx.session.tasks}

<b>ИТОГ:</b> <i>${ctx.session.total} часа</i>

#итоги_дня
`;

    await ctx.reply(finalMessage, { parse_mode: "HTML" });

    // удаляем все старые сообщения
    for (const id of ctx.session.messages) {
      try {
        await ctx.api.deleteMessage(ctx.chat.id, id);
      } catch (e) {
        console.log("Не удалось удалить сообщение:", e.description);
      }
    }

    ctx.session.messages = [];
  }
});

bot.start();
