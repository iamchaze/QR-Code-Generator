/*
1. Use Inquirer package to get input from user.
2. User qr-image package to convert user entered URL into QR image
3. 3.Create a txt file to save the user input using native fs node module 
*/

import inquirer from "inquirer";
import qr from "qr-image";
import fs from 'fs';

inquirer
  .prompt([
    {
      message: "Enter an URL: ",
      name: "URL",
    },
  ])
  .then((answers) => {
    const url = answers.URL;
    var qr_svg = qr.image(url);
    qr_svg.pipe(fs.createWriteStream("qrimg.png"));
    fs.writeFile("./links.txt", url, (err) => {
      if(err) throw err;
      console.log('The Link has been added.')
    } )
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
