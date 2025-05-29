import db from '../database/database';

interface AiResponse {
  success: boolean;
  message: string;
}
const config = useRuntimeConfig()
// Очередь запросов
const requestQueue = new Map<number, boolean>();

async function fetchAiResponse(prompt: string): Promise<string> {
  try {
    
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${config.apiKeyAi}`,
        "HTTP-Referer": "https://utrud.ru",
        "X-Title": "UTRUD Legal Assistant",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "model": "deepseek/deepseek-chat-v3-0324:free", // Меняем модель на более быструю или умную mistralai/mixtral-8x7b-instruct
        "messages": [
          {
            "role": "user",
            "content": prompt
          }
        ],
        "max_tokens": 500, // Уменьшаем количество токенов
        "temperature": 0.7,
        "stream": false // Отключаем стриминг для ускорения
      }),
      signal: AbortSignal.timeout(30000) // 30 секунд таймаут на уровне fetch
    });

    console.log('Response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error:', errorText);
      throw new Error(`API error ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    // Добавляем дисклеймер к каждому ответу
    return `${aiResponse}\n\n---\nВнимание!!! Я бот на основе ИИ. Для получения юридической консультации рекомендую обратиться к специалисту по трудовому праву: @urist_ryabova`;

  } catch (error) {
    console.error('Detailed fetch error:', error);
    throw error;
  }
}

export async function processMessage(userMessage: string): Promise<AiResponse> {
  const userId = Math.random();
  
  try {
    if (requestQueue.has(userId)) {
      return {
        success: false,
        message: 'Пожалуйста, подождите. Предыдущий запрос обрабатывается.'
      };
    }

    requestQueue.set(userId, true);
    console.log('Getting context from DB...');

    const contextRow = await db.prepare('SELECT body FROM contents WHERE block = ?')
      .get('aiContext');
    
    if (!contextRow?.body) {
      console.error('No context found in DB');
      throw new Error('Configuration error: No context found');
    }

    const prompt = `${contextRow.body}\n\nВопрос: ${userMessage}`;
    console.log('Sending prompt to AI...');

    const aiResponse = await fetchAiResponse(prompt);
    
    return {
      success: true,
      message: aiResponse
    };

  } catch (error) {
    console.error('Full error details:', error);
    
    if (error.name === 'AbortError' || error.message.includes('timeout')) {
      return {
        success: false,
        message: 'Извините, сервер не успел ответить. Попробуйте задать вопрос короче или повторите через минуту.'
      };
    }

    return {
      success: false,
      message: 'Произош ошибка при обработке запроса. Пожалуйста, попробуйте позже.'
    };

  } finally {
    requestQueue.delete(userId);
  }
}
