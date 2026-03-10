const figlet = require('figlet');

figlet("CHANDAN ", function (err, data) {
    if (err) {
        console.log("Something went wrong...");
        console.dir(err);  
        return;
    }
    console.log(data);
});

/* ____ _   _    _    _   _ ____    _    _   _
  / ___| | | |  / \  | \ | |  _ \  / \  | \ | |
 | |   | |_| | / _ \ |  \| | | | |/ _ \ |  \| |
 | |___|  _  |/ ___ \| |\  | |_| / ___ \| |\  |
  \____|_| |_/_/   \_\_| \_|____/_/   \_\_| \_|
*/