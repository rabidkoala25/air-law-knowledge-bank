const storage = {
  read(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (error) {
      return fallback;
    }
  },
  write(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {}
  }
};

function topicByNumber(number) {
  return TOPICS.find(topic => topic.num === number);
}

function questionsForTopic(number) {
  return QUESTIONS.filter(question => question.topic === number);
}

function shuffle(list) {
  const copy = list.slice();
  for (let index = copy.length - 1; index > 0; index--) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
}

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function stripTags(html) {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
}
