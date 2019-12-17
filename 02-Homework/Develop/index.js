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
            type: "list",
            choices: ["red", "pink", "blue", "green"],
            name: "color",

        },

    ])
        .then(function ({ username, color }) {
            const queryUrl = `https://api.github.com/users/${username}`

           return axios.get(queryUrl).then(function (res) {
                //  const general = res.data
                // const gitHubName = res.data.name
                // const userLink = res.data.repos_url
                // const imgUser = res.data.avatar_url
                // const bio = res.data.bio
                // const company = res.data.company
                // const publiR = res.data.public_repos
                // const followers = res.data.followers
                // const following = res.data.following
                // const location = res.data.location

                // console.log(gitHubName)
                // console.log(imgUser)
                // console.log(bio)
                // console.log(userLink);
                // console.log(company)
                // console.log(publiR)
                // console.log(followers)
                // console.log(following)
                // console.log(location)
                //  console.log(general);
                console.log(color,"<=======")
                fs.writeFile("test.html",generateHTML(res, color),(err)=>{
                    if(err) throw err
                    console.log("wrote the file")
                })
            })
        })
}

function generateHTML(res, color) {
    //console.log(res);

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

        <div class = "wrapper">
            <h1 class="photo-header" style = "color: ${color}"> ${res.data.name}</h1>
            <hr>
            <img class="photo-header img" src="${res.data.avatar_url}" alt="" style="width: 250px;height: 250px;">
            <div class="card" > </div>
            <div> Company:${res.data.company}</div>
            <a src= "${res.data.public_repos}"> Repo Link </a>
            <div> Public Repositories: ${res.data.public_repos}</div>
            <div> Followers: ${res.data.followers}</div>
            <div> Following: ${res.data.following}</div>
            <div>Location: ${res.data.location} </div>
        </div>
       </div>
      </div>
    </div>

</body>

</html>`;

}

async function init(){
try { 
    const res = await gitHubUser();

    // const html = generateHTML(res);
    // await  writeFileAsync('index.html', html);
    } 
    catch(err) {
        console.log(err);
    };

}
  
init();
    

