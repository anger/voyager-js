<p align="center">
  <img width="256" height="256" src="https://img.icons8.com/cotton/256/around-the-globe--v4.png" alt="around-the-globe--v4"/>
</p>

# Voyager.js

Voyager.js is a Node.js script designed for testing URLs for template injection vulnerabilities. It automates the process of appending known injection strings to URLs and monitors the responses for signs of successful injection.

## Features

- **Injection Testing**: Tests a list of known injection strings against provided URLs.
- **User-Agent Rotation**: Cycles through a list of user agents for each request.
- **Command-Line Options**: Customizable user agents, injection values, and logging.
- **Logging**: Option to log successful injections to a file for further analysis.

## Installation

Before installing, ensure you have Node.js installed on your system. You can download Node.js from [here](https://nodejs.org/).

Clone the repository & install required dependencies:

```bash
git clone https://github.com/anger/voyager-js.git
cd voyager-js
npm install
```

## Usage

To run the script, use the following command in your terminal:

```bash
node voyager.js
```

### Command-Line Options

    --log, -l: Enable logging of successful injections to a file.
    --user-agent, -u: Specify a custom user agent for requests.
    --value, -v: Test a specific injection value.

Example of running with options:

```bash
node voyager.js --log
node voyager.js --user-agent "Custom User Agent"
node voyager.js --value "{{1337*1337}}"
```

Enter the base URL to test at the prompt. To stop the script, type 'exit' or use Ctrl+C.

## Future Features

Planned enhancements for Voyager.js include:

1. **Interactive CLI**: Implementing a more interactive command-line interface using libraries like `inquirer.js` for a better user experience.

2. **Advanced Error Handling**: Enhancing error handling to manage different types of errors more effectively, providing more detailed feedback to the user.

3. **Proxy Support**: Adding the ability to route requests through proxies for testing from different network locations or for privacy concerns.

4. **Parameterized Injection Points**: Allowing users to specify where in the URL the injection values should be placed, such as in the query parameters, path, or even in HTTP headers.

5. **Extended Timeout Control**: Providing options to set custom timeout durations for different types of connections and responses.

6. **Rate Limiting**: Incorporating rate limiting features to prevent sending too many requests in a short time frame.

7. **Automated Scripting**: Enabling the tool to run automated scripts for batch processing of multiple URLs or injection patterns.

8. **Integration with Security Tools**: Integrating with popular security testing frameworks or vulnerability scanners for more comprehensive testing capabilities.

9. **Customizable Output Formats**: Allowing users to choose different formats for output logs, such as JSON, XML, or CSV, for easier integration with other tools and systems.

10. **Dockerization**: Packaging the application in a Docker container for ease of deployment and consistency across various environments.

11. **Multithreading/Parallel Requests**: Implementing multithreading or parallel processing to handle multiple requests simultaneously, thus improving the tool's efficiency.

12. **Enhanced Logging Options**: Expanding the logging functionality to include different levels of verbosity and the ability to log to different destinations (files, databases, etc.).

13. **Time Based SSTI Payloads**

These features aim to enhance the usability, functionality, and versatility of Voyager.js, making it a more comprehensive tool for SSTI testing.

