const queryString = require("querystring");
const fs = require("fs");
const path = require("path");

const saveUser = user => {
    const userName = user.username;
    const filePath = path.join(__dirname, "../../db/users", `${userName}.json`);

    fs.writeFile(filePath, JSON.stringify(user), function (err) {
        if (err) throw err;
        console.log(`${userName}.json was created`);
    })
}

const signupRoute = (request, response) => {
    
  
    if (request.method === 'POST') {
      let body = '';
  
      request.on('data', function (data) {
        body = body + data;
  
        console.log('Incoming data!!!!');
      });
  
      request.on('end', function () {
        const post = queryString.parse(body);
        console.log(post);
        saveUser(post);

        const resolveSuccess = {
            status: 'success',
            user: post
        }

        response.writeHead(200, {
            "Content-type": "application/json"
        });
        
        response.end(JSON.stringify(resolveSuccess));
    });

    }
}
module.exports = signupRoute;