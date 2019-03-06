/** Command-line tool to generate Markov text. */

const fs = require('fs');
const process = require('process');
const axios = require('axios');
const {MarkovMachine} = require('./markov');

/** handle output: write to file if out given, else print */

function handleOutput(text, out) {
  if (out) {
    fs.writeFile(out, text, 'utf8', function(err) {
      if (err) {
        console.error(`Couldn't write ${out}: ${err}`);
        process.exit(1);
      }
    });
  } else {
    let markov = new MarkovMachine(text);
    console.log(markov.makeText());
  }
}

/** read file at path and print it out. */

function cat(path, out) {
  fs.readFile(path, 'utf8', function(err, data) {
    if (err) {
      console.error(`Error reading ${path}: ${err}`);
      process.exit(1);
    } else {
      handleOutput(data, out);
    }
  });
}

/** read page at URL and print it out. */

async function webCat(url, out) {
  try {
    let resp = await axios.get(url);
    handleOutput(resp.data, out);
  } catch (err) {
    console.error(`Error fetching ${url}: ${err}`);
    process.exit(1);
  }
}

let path;
let out;

if (process.argv[2] === "file") {
  cat(process.argv[3]);
}
else if (process.argv[2] === "url") {
  webCat(process.argv[3]);
}

// if (path.slice(0, 4) === 'http') {
//   webCat(path, out);
// } else {
//   cat(path, out);
// }