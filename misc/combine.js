const fs = require('fs');

let all = {};

for (let i = 0; i < 190; i++) {
  if (fs.existsSync(`./output${i}.json`)) {
    const data = fs.readFileSync(`./output${i}.json`);
    const res = JSON.parse(data);
    all = { ...all, ...res };
  }
}

Object.entries(all).forEach(
  ([k, { text, description, creditHours, label }]) => {
    fs.appendFileSync(
      'output.csv',
      `${clean(k)},${clean(label)},${clean(text)},${clean(creditHours)},${clean(
        description
      )}\n`
    );
  }
);

function clean(s) {
  return s ? s.replace(/\,/g, ' ') : '';
}

fs.writeFileSync('output.json', JSON.stringify(all));
