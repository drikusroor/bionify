const button = document.querySelector("button");

button.addEventListener("click", function () {
  // Load words.json using http request
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "words.json", true);
  xhr.onload = function () {
    if (this.status == 200) {
      const words = JSON.parse(this.responseText);

      bionify(words);
    }
  };
  xhr.send();
});

function bionify(words) {
  // Get all paragraphs and bionify them
  const paragraphs = document.querySelectorAll("p");
  paragraphs.forEach(function (paragraph) {
    const text = paragraph.innerText;
    const bionified = bionifyText(text, words);
    paragraph.innerHTML = bionified;
  });
}

function bionifyText(text, words) {
  // Replace all words in text with bionified version
  return text
    .split(" ")
    .map(function (word) {
      const bionifiedWord = bionifyWord(word, words);
      return bionifiedWord;
    })
    .join(" ");
}

function bionifyWord(word, words) {
  // Replace word with bionified version
  const entry = words[word];

  let syllables = [];
  if (
    (!!entry && typeof entry === "number") ||
    typeof entry === "object" ||
    typeof entry === "array" ||
    typeof entry === "string"
  ) {
    syllables = entry;
  } else {
    syllables = syllabify(word);
  }

  syllables[0] = `<b>${syllables[0]}</b>`;
  try {
    const bionifiedWord = syllables.join("");

    return bionifiedWord;
  } catch (error) {
    console.log(syllables, word, error);
  }
}

const syllableRegex =
  /[^aeiouy]*[aeiouy]+(?:[^aeiouy]*$|[^aeiouy](?=[^aeiouy]))?/gi;

function syllabify(word) {
  return word.match(syllableRegex) || [word];
}
