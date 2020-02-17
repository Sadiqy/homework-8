const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const api = require("./utils/api");
//const generateMarkdown = require("./utils/generateMarkdown");
/*const questions = [

]; */


// template literals, json.stringify(),

questions = [
  {
    message: "Enter your GitHub username",
    name: "username"
  }
  , {
    message: "What is your project's name?",
    name: "projectName"
  },
  {
    message: "Please write a short description of your project.",
    name: "description"
  },
  {
    type: "list",
    choices: ['MIT', 'GNU', 'Apache'],
    message: "What kind of license should your project have?",
    name: "license"
  },
  {
    message: "What command should be run to install dependencies?",
    name: "dependenciesCommand"
  },
  {
    message: "What command should be run to run tests?",
    name: "testCommand"
  },
  {
    message: "What does the user need to know about using the repo?",
    name: "repoKnowledge"
  },
  {
    message: "What does the user type to install app?",
    name: "installation"
  },
  {
    message: "Who are the contributors of this repo? (please separate github usernames by commas)",
    name: "contributors"
  },
]



let init = () => {

  inquirer.prompt(questions)
    .then(function (res) {
      const queryUrl = `https://api.github.com/users/${res.username}`;
      axios.get(queryUrl)
        .then(function (gitresponse) {
          writeFile({ ...res, ...gitresponse.data })
        }).catch(err => console.log(err))
    }).catch(err => console.log(err))

}

writeFile = (data) => {
  console.log(data);
  let contributors = data.contributors.split(',')
  let contributorStr = ''
  contributors.map(name => {
    contributorStr += `[${name.trim()}](https://github.com/${name.trim()})    `
  })

  let license = data.license === 'MIT' ? '(https://img.shields.io/badge/license-MIT-blue.svg)' : data.license === 'GNU' ?
    '(https://img.shields.io/badge/License-GPLv3-blue.svg)' : '(https://img.shields.io/badge/License-Apache%202.0-blue.svg)'
  let readme = `
# README PROJECT
[![GitHub license]${license}](${data.html_url})
​
## Description
​
${data.description}
​
## Table of Contents 
​
* [Installation](#installation)
​
* [Usage](#usage)
​
* [License](#license)
​
* [Contributing](#contributing)
​
* [Tests](#tests)
​
* [Questions](#questions)
​
## Installation
​
${data.installation}
​
## Usage
​
${data.repoKnowledge}
​
## License
​
This project is licensed under the ${data.license} license.
  
## Contributing

${contributorStr}
​
## Tests
​
To run tests, run the following command:
${data.testCommand}
​
## Questions
​
<img src="${data.avatar_url}" alt="avatar" style="border-radius: 16px" width="30" />
​
If you have any questions about the repo, open an issue or contact [${data.login}](${data.html_url}) directly at ${data.location}.

`
  fs.writeFile("./NodeReadMe.md", readme, function (err) {
    if (err) {
      console.log(err)
    }
  })
}



  //axios get request

  // axios
  //   .get(queryUrl)
  //   .then(function (res) {
  //       console.log(res);

  //     inquirer
  //     .prompt({

  //     })


  // function writeToFile(fileName, data) {
  // } 


init();
