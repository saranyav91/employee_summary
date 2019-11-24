const fs = require("fs");
const engclass = require("./lib/engineer");
const managerclass = require("./lib/manager");
const internclass = require("./lib/intern");
const employeeclass = require("./lib/employee");

const inquirer = require("inquirer");
var count = 0;
function managerDetails() {
    var htmlinit = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
        <link href="http://maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet"> 
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <script src='https://kit.fontawesome.com/a076d05399.js'></script>
        <title>Team</title>
    </head>
    <body>
        <div style = "background-color: #e84855; color:white"class = "jumbotron">
        <h1 class ="text-center"> My Team</h1></div><div class="container">
        <div class="row">`;
    fs.writeFile('./output/team.html', htmlinit, function (err) {
        if (err) throw err;
        //console.log('Saved!');
    });
    inquirer
        .prompt([{
            message: "Enter manager details",
            name: "usernameManager",

        },
        {
            message: "Enter manager name",
            name: "managerName"
        },
        {
            message: "Enter manager id",
            name: "managerid"
        },
        {
            message: "Enter manager email",
            name: "manageremail"
        },
        {
            message: "Enter manager office number",
            name: "managerofficenumber"
        },

        ]).then(answers => {

            var managerObj = new managerclass(answers.managerName, answers.managerid, answers.manageremail, answers.managerofficenumber);
            var html = managerCard(managerObj);
            fs.appendFile('./output/team.html', html, function (err) {
                if (err) throw err;
                //console.log('Saved!');
            });
            choices();

        });
}
function choices() {
    inquirer
        .prompt([{
            type: 'list',
            name: 'otherdetails',
            message: 'Choose any one',
            choices: ['Engineer', 'Intern', 'Finish entering details'],
        }
        ]).then(answers => {
            if (answers.otherdetails == "Engineer") {
                engineerDetails();
            }
            else if (answers.otherdetails == "Intern") {
                internDetails();
            }
            else {
                //render page
            }
        });
}
function engineerDetails() {
    inquirer
        .prompt([

            {
                message: "Enter Engineer details",
                name: "usernameEngineer",

            },

            {
                message: "Enter Engineer name",
                name: "engineerName"
            },
            {
                message: "Enter Engineer id",
                name: "engineerid"
            },
            {
                message: "Enter Engineer email",
                name: "engineeremail"
            },
            {
                message: "Enter Engineer github id",
                name: "engineerGithub"
            },
        ]).then(answers => {
            // console.log(answers.engineeremail);
            var engineerObj = new engclass(answers.engineerName, answers.engineerid, answers.engineeremail, answers.engineerGithub);
            var html = engineerCard(engineerObj);
            //console.log(html);
            fs.appendFile('./output/team.html', html, function (err) {
                if (err) throw err;
                //console.log('Saved!');
            });
            choices();

        });

}
function internDetails() {
    inquirer
        .prompt([
            {
                message: "Enter intern details",
                name: "usernameIntern",

            },
            {
                message: "Enter Intern name",
                name: "internName"
            },
            {
                message: "Enter Intern id",
                name: "internid"
            },
            {
                message: "Enter Intern email",
                name: "internemail"
            },
            {
                message: "Enter Intern school",
                name: "internschool"
            },
        ]).then(answers => {
            //console.log(answers.internemail);
            var internObj = new internclass(answers.internName, answers.internid, answers.internemail, answers.internschool);
            var html = internCard(internObj);
            fs.appendFile('./output/team.html', html, function (err) {
                if (err) throw err;
                //console.log('Saved!');
            });
            choices();

        });

}

function managerCard(managerObj) {
    var name = managerObj.getName();
    var id = "ID: " + managerObj.getId();
    var email = managerObj.getEmail();
    var officeNum = "Office Number: " + managerObj.getOfficeNumber();
    var role = " " + managerObj.getRole();

    var html = `<div class="col-sm-4"><div class="card" style="width: 18rem;">
    <div class="card-body" style = "background-color:#0077f7;color:white">
    <h3 class="card-title">`+ name + `</h3>
    <p class="card-text"><i class="fa fa-coffee"></i>`+ role + `</p>
  </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">`+ id + `</li>
      <li class="list-group-item">Email: <a href="https://www.`+ email + `">` + email + `</a></li>
      <li class="list-group-item">`+ officeNum + `</li>
    </ul>
  </div></div>`;
    //console.log("manager"+html);
    return html;

}
function engineerCard(engineerObj) {
    var name = engineerObj.getName();
    var id = "ID: " + engineerObj.getId();
    var email = engineerObj.getEmail();
    var github = engineerObj.getGithub();
    var role = " " + engineerObj.getRole();

    var html = `<div class="col-sm-4"><div class="card" style="width: 18rem;">
    <div class="card-body" style = "background-color:#0077f7;color:white">
    <h3 class="card-title">`+ name + `</h3>
    <p class="card-text"><i class="fas fa-glasses"></i>`+ role + `</p>
  </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">`+ id + `</li>
      <li class="list-group-item">Email: <a href="https://www.`+ email + `">` + email + `</a></li>
      <li class="list-group-item">Github: <a href="https://github.com/`+ github + `">` + github + `</a></li>
    </ul>
  </div></div>`;
    //console.log("engineer "+html);
    return html;
}
function internCard(internObj) {
    var name = internObj.getName();
    var id = "ID: " + internObj.getId();
    var email = internObj.getEmail();
    var school = "School: " + internObj.getSchool();
    var role = " " + internObj.getRole();

    var html = `<div class="col-sm-4"><div class="card" style="width: 18rem;">
    <div class="card-body" style = "background-color:#0077f7;color:white">
    <h3 class="card-title">`+ name + `</h3>
    <p class="card-text"><i class="fas fa-user-graduate" ></i>`+ role + `</p>
  </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">`+ id + `</li>
      <li class="list-group-item">Email: <a href="https://www.`+ email + `">` + email + `</a></li>
      <li class="list-group-item">`+ school + `</li>
    </ul>
  </div></div>`;
    //console.log("intern "+html);
    return html;
}
managerDetails();