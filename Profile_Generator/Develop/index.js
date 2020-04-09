const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
var pdf = require('html-pdf');
// const util = require("util");


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
        const general = res.data
        // const gitHubName = res.data.name
        // const userLink = res.data.repos_url
        // const imgUser = res.data.avatar_url
        // const bio = res.data.bio
        // const company = res.data.company
        // const publiR = res.data.public_repos
        // const github = res.data.html_url
        // const followers = res.data.followers
        // const following = res.data.following
        // const location = res.data.location

        // console.log(gitHubName)
        // console.log(imgUser)
        // console.log(bio)
        // console.log(userLink);
        // console.log(company)
        // console.log(github)
        // console.log(publiR)
        // console.log(followers)
        // console.log(following)
        // console.log(location)
        console.log(general);
        // console.log(color,"<=======")
        // 



        fs.writeFile("test.html", generateHTML(res, color), (err) => {
          if (err) throw err
          console.log("wrote the file")
          var html = fs.readFileSync('test.html', 'utf8');
          var options = { format: 'Letter' };


          pdf.create(html, options).toFile('test.pdf', function (err, res) {
            if (err) return console.log(err);
            console.log(res);
          });
        })


      })
    })
}
const colors = {
  green: {
    wrapperBackground: "#E6E1C3",
    headerBackground: "#C1C72C",
    headerColor: "black",
    photoBorderColor: "#black"
  },
  blue: {
    wrapperBackground: "#5F64D3",
    headerBackground: "#26175A",
    headerColor: "white",
    photoBorderColor: "#73448C"
  },
  pink: {
    wrapperBackground: "#879CDF",
    headerBackground: "#FF8374",
    headerColor: "white",
    photoBorderColor: "#FEE24C"
  },
  red: {
    wrapperBackground: "#DE9967",
    headerBackground: "#870603",
    headerColor: "white",
    photoBorderColor: "white"
  }
};


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

          @page {
            margin: 0;
          }
         *,
         *::after,
         *::before {
         box-sizing: border-box;
         }
         html, body {
         padding: 0;
         margin: 0;
         }
         html, body, .wrapper {
         height: 100%;
         }
         .wrapper {
         background-color: ${colors[color].wrapperBackground};
         padding-top: 100px;
         }
         .footer {
          background-color: ${colors[color].wrapperBackground};
          bottom:0%;
          height:300px;
          position:fixed;
          padding:20px;
         }
         body {
         background-color: white;
         -webkit-print-color-adjust: exact !important;
         font-family: 'Cabin', sans-serif;
         }
         main {
         background-color: #E9EDEE;
         height: auto;
         padding-top: 30px;
         }
         h1, h2, h3, h4, h5, h6 {
         font-family: 'BioRhyme', serif;
         margin: 0;
         }
         h1 {
         font-size: 3em;
         }
         h2 {
         font-size: 2.5em;
         }
         h3 {
         font-size: 2em;
         }
         h4 {
         font-size: 1.5em;
         }
         h5 {
         font-size: 1.3em;
         }
         h6 {
         font-size: 1.2em;
         }
         .photo-header {
         position: relative;
         margin: 0 auto;
         margin-bottom: -50px;
         display: flex;
         justify-content: center;
         flex-wrap: wrap;
         background-color: ${colors[color].headerBackground};
         color: ${colors[color].headerColor};
         padding: 10px;
         width: 95%;
         border-radius: 6px;
         }
         .photo-header img {
         width: 250px;
         height: 250px;
         border-radius: 50%;
         object-fit: cover;
         margin-top: -75px;
         border: 6px solid ${colors[color].photoBorderColor};
         box-shadow: rgba(0, 0, 0, 0.3) 4px 1px 20px 4px;
         }
         .photo-header h1, .photo-header h2 {
         width: 100%;
         text-align: center;
         }
         .photo-header h1 {
         margin-top: 10px;
         }
         .links-nav {
         width: 100%;
         text-align: center;
         padding: 20px 0;
         font-size: 1.1em;
         }
         .nav-link {
         display: inline-block;
         margin: 5px 10px;
         }
         .workExp-date {
         font-style: italic;
         font-size: .7em;
         text-align: right;
         margin-top: 10px;
         }
         .container {
         padding: 50px;
         padding-left: 100px;
         padding-right: 100px;
         }

         .row {
           display: flex;
           flex-wrap: wrap;
           justify-content: space-between;
           margin-top: 20px;
           margin-bottom: 20px;
         }

         .card {
           padding: 20px;
           border-radius: 6px;
           background-color: ${colors[color].headerBackground};
           color: ${colors[color].headerColor};
           margin: 20px;
         }
         
         .col {
         flex: 1;
         text-align: center;
         }

         a, a:hover {
         text-decoration: none;
         color: inherit;
         font-weight: bold;
         }

         @media print { 
          body { 
            zoom: .75; 
          } 
         }


        </style>
    </head>
    <body>

     <div class="container">
       <div class="row">
         <div class = " col  wrapper">
         <div class ="photo-header">
         <img  src="${res.data.avatar_url}" alt="Profile Pic">
         </div>
          <br>
          <br>
          <h3 class="" style = "color: ${color};"> ${res.data.name}</h3>
          <hr>
          <div class="row">
          <div class="col"> <h5>Location: ${res.data.location} </h5> </div>
          <div class ="col">
          <i class="fab fa-github">  </i>
          <a class="col" href= "${res.data.html_url}"> <h5> GitHub Profile</h5> </a>
          </div>
        
          <div class="col"> <h5>Company:${res.data.company} </h5> </div>
        </div>  
        <div class="col"><a href="${res.data.blog}"> <h5> Portfolio</h5> </a>  </div>
       </div>    
    </div>    
     <div> 
     <p>
       ${res.data.bio}
     </p>
     </div>

         <div container="container"> 
            <div class="row">
            <div class="card" > <h4>Public Repositories: ${res.data.public_repos} </h4></div>
            <div class="card" > <h4>Followers: ${res.data.followers} </h4> </div>
            <div class="card" > <h4> Following: ${res.data.following}</h4> </div>
            <div class="card" ><h4> <a href="${res.data.repos_url}"> Check Repos</a></h4> </div>
            <div class="card"><h4> Id:${res.data.id}</h4> </div>

          </div>

            
           
            
        </div>
        <div class="container">
        <div class=" col  wrapper"></div>
        </div>
    
</body>


</html>`;

}

async function init() {
  try {
    const res = await gitHubUser();

    // const html = generateHTML(res);
    // await  writeFileAsync('index.html', html);
  }
  catch (err) {
    console.log(err);
  };

}

init();


