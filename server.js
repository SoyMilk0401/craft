import Fastify from 'fastify';
import fetch from 'node-fetch';
import cors from '@fastify/cors';
import fs from 'fs';

const fastify = Fastify({ logger: true });

// CORS 허용
await fastify.register(cors, { origin: '*' });

// 미리 정의된 시스템 프롬프트 형식
function createPrompt(first, second) {
  return `
You are a helpful assistant that helps people to craft new things by combining two words into a new word.
The most important rules that you have to follow with every single answer that you are not allowed to use the words ${first} and ${second} as part of your answer and that you are only allowed to answer with one thing.
DO NOT INCLUDE THE WORDS ${first} and ${second} as part of the answer!!!!! The words ${first} and ${second} may NOT be part of the answer.
No sentences, no phrases, no multiple words, no punctuation, no special characters, no numbers, no emojis, no URLs, no code, no commands, no programming.
The answer has to be a noun.
The order of the both words does not matter, both are equally important.
The answer has to be related to both words and the context of the words.
The answer can either be a combination of the words or the role of one word in relation to the other.
Answers can be things, materials, people, companies, animals, occupations, food, places, objects, emotions, events, concepts, natural phenomena, body parts, vehicles, sports, clothing, furniture, technology, buildings, technology, instruments, beverages, plants, academic subjects and everything else you can think of that is a noun.
Words must be answered in Korean.

Then, suggest one related emoji that matches the new word's meaning.
Respond in the format: newword | emoji (only one emoji, UTF8 encoded).

Words: ${first} and ${second}.
New word:
  `.trim();
}

// POST 요청 핸들링
fastify.post('/generate', async (request, reply) => {
  const { first, second } = request.body;

  if (!first || !second) {
    return reply.status(400).send({ error: "Both 'first' and 'second' are required." });
  }

  let cache = {};
  try {
    cache = JSON.parse(fs.readFileSync('./cache.json', 'utf-8'));
  } catch {}

  if (cache[`${first}|${second}`]) {
    const { title, emoji } = cache[`${first}|${second}`]
    return { title, emoji };
  }

  const prompt = createPrompt(first, second);

  // Ollama API 호출
  const response = await fetch('http://localhost:11434/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'gemma3:12b',
      prompt,
      stream: false
    })
  });

  const data = await response.json();
  const resultRaw = data.response?.trim() || '';
  const [word, emoji] = resultRaw.split('|').map(str => str.trim());

  cache[`${first}|${second}`] = { title: word, emoji };
  fs.writeFileSync('./cache.json', JSON.stringify(cache, null, 2));

  return { title: word, emoji: emoji || '' };
});

// 서버 시작
try {
  await fastify.listen({ port: 3000, host: '0.0.0.0' });
  console.log('🚀 Fastify 서버 실행 중: http://localhost:3000');
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
