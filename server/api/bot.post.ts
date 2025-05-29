import { Telegraf } from 'telegraf';
import { defineEventHandler } from 'h3'; // Добавьте в начало файла
import type { Context } from 'telegraf';
import { processMessage } from '../utils/aibot';

const config = useRuntimeConfig()
const BOT_TOKEN = config.telegramToken;
const CHAT_ID = config.telegramChatId;
const OFFICE_ADDRESS = 'г. Севастополь, ул. Юмашева, д. 4В';
const STAFF_USERNAME = config.telegramUserName;

const bot = new Telegraf(BOT_TOKEN);

// Состояния для диалогов
const userStates = new Map<number, { command: string; step?: string; name?: string; phone?: string }>();

// Главное меню бота
const mainMenu = {
  reply_markup: {
    inline_keyboard: [
      [{ text: '📝 Запись на онлайн консультацию', callback_data: 'online' }],
      [{ text: '🏢 Запись на очную консультацию', callback_data: 'offline' }],
      [{ text: '⏰ Режим работы / 📍 Адрес', callback_data: 'office' }]
    ]
  }
};

const WELCOME_MESSAGE = `
Добро пожаловать! 👋
Я бот-помошник Трудового юриста Рябовой Евгении Игоревны
Я помогу вам:
📝 Записаться на онлайн-консультацию
🏢 Записаться на очную консультацию
📍 Узнать наш адрес и режим работы

Задайте мне вопрос по трудовому праву или перейдите в чат с юристом->

Чат с юристом: https://t.me/${STAFF_USERNAME}`;

// Функция для запроса даты и времени
const askDateTime = async (ctx: Context, type: String) => {
  await ctx.reply(
    'Выберите дату и время консультации:',
    {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'Выбрать дату и время', callback_data: `select_${type}` }]
        ]
      }
    }
  );
};

const getAvailableHours = () => {
  const hours = [];
  for (let i = 9; i <= 20; i++) {
    hours.push(`${i}:00`);
  }
  return hours;
};

// Обработчик новых пользователей и первых сообщений
bot.on('my_chat_member', async (ctx) => {
  try {
    await ctx.reply(WELCOME_MESSAGE, mainMenu);
  } catch (error) {
    console.error('Error in my_chat_member handler:', error);
  }
});

// Перехватчик всех обновлений
bot.use(async (ctx, next) => {
  // Если это первое взаимодействие с ботом
  if (!ctx.message && !ctx.callbackQuery) {
    await ctx.reply(WELCOME_MESSAGE, mainMenu);
    return;
  }
  await next();
});

// Обработчик команды /start
bot.command('start', async (ctx) => {
  try {
    const [, command] = ctx.message.text.split(' ');

    if (command) {
      if (command === 'office') {
        await ctx.reply(`📍 Адрес: ${OFFICE_ADDRESS}\n⏰ Режим работы: c 10-00 до 18-00`);
        return;
      }

      if (command === 'online' || command === 'offline') {
        userStates.set(ctx.from.id, { command });
        await askDateTime(ctx, command);
        return;
      }
    }

    // Базовое приветствие
    await ctx.reply(WELCOME_MESSAGE, mainMenu);
  } catch (error) {
    console.error('Error in start command:', error);
  }
});

// Обработчик команд
bot.command(['online', 'offline', 'office'], async (ctx) => {
  try {
    const command = ctx.message.text.substring(1);
    
    if (command === 'office') {
      await ctx.reply(`📍 Адрес: ${OFFICE_ADDRESS}\n⏰ Режим работы: c 10-00 до 18-00`);
      return;
    }

    if (command === 'online' || command === 'offline') {
      // Сохраняем тип консультации и устанавливаем шаг "name"
      userStates.set(ctx.from.id, { command: command, step: 'name' });
      await ctx.reply('Как к вам обращаться?');
      return;
    }
  } catch (error) {
    console.error('Error in command handler:', error);
  }
});

// Обработчик inline кнопок
bot.action(['online', 'offline', 'office'], async (ctx) => {
  try {
    await ctx.answerCbQuery();

    const data = ctx.callbackQuery?.data;
    if (!data) return;

    if (data === 'office') {
      await ctx.reply(`📍 Адрес: ${OFFICE_ADDRESS}\n⏰ Режим работы: c 10-00 до 18-00`);
      return;
    }

    if (data === 'online' || data === 'offline') {
      // Сохраняем тип консультации
      userStates.set(ctx.from.id, { command: data, step: 'name' });

      // Запрашиваем имя
      await ctx.reply('Как к вам обращаться?');
      return;
    }
  } catch (error) {
    console.error('Error in button handler:', error);
  }
});

// Обработчик текстовых сообщений
bot.on('text', async (ctx) => {
  try {
    const userId = ctx.from.id;
    const state = userStates.get(userId);

    // Если есть активное состояние, обрабатываем его
    if (state) {
      // Обработка ввода имени
      if (state.step === 'name') {
        state.name = ctx.message.text;
        state.step = 'phone';
        await ctx.reply('Введите ваш номер телефона:');
        return;
      }

      // Обработка ввода телефона
      if (state.step === 'phone') {
        state.phone = ctx.message.text;
        state.step = 'datetime';

        // Показываем календарь для выбора даты
        const date = new Date();
        date.setDate(date.getDate() + 1);

        const keyboard = [];
        for (let i = 0; i < 10; i++) {
          const currentDate = new Date(date);
          currentDate.setDate(date.getDate() + i);
          if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
            keyboard.push([{
              text: currentDate.toLocaleDateString('ru-RU'),
              callback_data: `day_${state.command}_${currentDate.toISOString().split('T')[0]}`
            }]);
          }
        }

        await ctx.reply('Выберите удобную дату:', {
          reply_markup: { inline_keyboard: keyboard }
        });
        return;
      }
      return;
    }

    // Если нет активного состояния, обрабатываем как обычное сообщение
    const userMessage = ctx.message.text;
    
    // Показываем "печатает..."
    await ctx.sendChatAction('typing');

    // Получаем ответ от нейросети
    const response = await processMessage(userMessage);
    
    if (response.success) {
      await ctx.reply(response.message);
    } else {
      await ctx.reply('Извините, произошла ошибка. Попробуйте позже.');
    }

  } catch (error) {
    console.error('Error in text handler:', error);
    await ctx.reply('Произошла ошибка при обработке сообщения.');
  }
});

// Обновляем обработчик выбора времени
bot.action(/^time_/, async (ctx) => {
  try {
    if (!ctx.callbackQuery?.data) return;
    const data = ctx.callbackQuery.data;
    const [, type, date, time] = data.split('_');
    const formattedDate = new Date(date).toLocaleDateString('ru-RU');

    const state = userStates.get(ctx.from.id);
    const userName = state.name;
    const userPhone = state.phone;

    if (type === 'online') {
      await ctx.reply('✅ Спасибо за запись! Мы свяжемся с вами в указанное время.');
      await bot.telegram.sendMessage(
        CHAT_ID,
        `📱 Новая заявка на онлайн-консультацию!\n👤 Имя: ${userName}\n📞 Телефон: ${userPhone}\n📅 Дата: ${formattedDate}\n🕒 Время: ${time}`
      );
    } else {
      await ctx.reply(`✅ Спасибо за запись! Ждем вас ${formattedDate} в ${time} по адресу: ${OFFICE_ADDRESS}`);
      await bot.telegram.sendMessage(
        CHAT_ID,
        `👥 Новая заявка на очную консультацию!\n👤 Имя: ${userName}\n📞 Телефон: ${userPhone}\n📅 Дата: ${formattedDate}\n🕒 Время: ${time}`
      );
    }

    userStates.delete(ctx.from.id);
    await ctx.reply('Выберите действие:', mainMenu);
  } catch (error) {
    console.error('Error in time selection:', error);
  }
});

bot.action(/^calendar_/, async (ctx) => {
  try {
    if (!ctx.callbackQuery || !('data' in ctx.callbackQuery)) return;
    const data = ctx.callbackQuery.data;
    const [, type] = data.split('_');
    const date = new Date();
    date.setDate(date.getDate() + 1); // Начинаем со следующего дня

    const keyboard = [];
    for (let i = 0; i < 10; i++) {
      const currentDate = new Date(date);
      currentDate.setDate(date.getDate() + i);
      if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) { // Пропускаем выходные
        keyboard.push([{
          text: currentDate.toLocaleDateString('ru-RU'),
          callback_data: `day_${type}_${currentDate.toISOString().split('T')[0]}`
        }]);
      }
    }

    await ctx.reply('Выберите дату (показаны только рабочие дни):', {
      reply_markup: { inline_keyboard: keyboard }
    });
  } catch (error) {
    console.error('Error in calendar:', error);
  }
});

bot.action(/^day_/, async (ctx) => {
  try {
    if (!ctx.callbackQuery || !('data' in ctx.callbackQuery)) return;
    const data = ctx.callbackQuery.data;
    const [, type, date] = data.split('_');
    const hours = getAvailableHours();
    const keyboard = hours.map(hour => [{
      text: hour,
      callback_data: `time_${type}_${date}_${hour}`
    }]);

    await ctx.reply('Выберите время:', {
      reply_markup: { inline_keyboard: keyboard }
    });
  } catch (error) {
    console.error('Error in day selection:', error);
  }
});

// Обработчик ошибок
bot.catch((error: any) => {
  console.error('Bot error:', error.message);
});

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    await bot.handleUpdate(body);
    return { ok: true };
  } catch (error: any) {
    console.error('Webhook handler error:', error.message);
    return {
      ok: false,
      error: error.message
    };
  }
});