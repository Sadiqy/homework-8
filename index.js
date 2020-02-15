const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
/*const questions = [

]; */


let questions = [{
  message: "What is your project's name?",
  name: "projectName"

},
{
  message: "Please write a short description of your project.",
  name: "description"
}
]

let init = () => {

  inquirer.prompt({
    message: "Enter your GitHub username",
    name: "username"
  }).then(function (res) {
    const queryUrl = `https://api.github.com/users/${res.username}/repos?per_page=100`;
    return axios.get(queryUrl)
  }).then(function (response) {
    inquirer.prompt(questions).then(function (answer){
      console.log(answer);
    })
   
  })




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


}
init();
