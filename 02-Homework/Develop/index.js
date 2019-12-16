const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

function gitHubUser() {
    return inquirer.prompt([
        {
            type: "input",
            message: "Enter your GitHub username:",
            name: "username",
        },

        {
            type: "checkbox",
            choices: ["red", "pink", "blue", "green"],
            name: "color",

        },

    ])
        .then(function ({ username }) {
            const queryUrl = "https://api.github.com/users/" + username

            axios.get(queryUrl).then(function (res) {
                //  const general = res.data
                const gitHubName = res.data.name
                const userLink = res.data.repos_url
                const imgUser = res.data.avatar_url
                const bio = res.data.bio
                const company = res.data.company
                const publiR = res.data.public_repos
                const followers = res.data.followers
                const following = res.data.following
                const location = res.data.location

                console.log(gitHubName)
                console.log(imgUser)
                console.log(bio)
                console.log(userLink);
                console.log(company)
                console.log(publiR)
                console.log(followers)
                console.log(following)
                console.log(location)
                //  console.log(general);


            })
        })
}

function generateHTML(data) {

    return `<!DOCTYPE html>
  <html lang="en">
     <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"/>
        <link href="https://fonts.googleapis.com/css?family=BioRhyme|Cabin&display=swap" rel="stylesheet">
        <title>Document</title>
        <style>
        </style>
    </head>
    <body>
    <div class="jumbotron jumbotron-fluid">
        <div class="container">
        <div class="row">
      ////////
           <div class = "wrapper">
            <h1 class="photo-header"> ${data.username}</h1>
            <hr>
            <img class="photo-header img" src="${data.color}" alt="" style="width: 250px;height: 250px;">
            <div class="card" > </div>
            <div> Company:</div>
            <div> Repo</div>
            <div> Public</div>
            <div> Follo</div>
            <div>Location</div>
            </div>
         </div>

         </div>
    </div>
    ////////

  </body>   

  </html>`;

}

gitHubUser()
    .then(function (data) {
        const html = generateHTML(data);
        return writeFileAsync('index.html', html);
    })
    .then(function () {
        console.log("Success");
    })
    .catch(function (err) {
        console.log(err);
    });

