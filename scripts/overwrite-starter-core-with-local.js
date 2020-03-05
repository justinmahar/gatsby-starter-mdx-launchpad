const fs = require('fs');
const rimraf = require('rimraf');
const ncp = require('ncp').ncp;

const starterCorePath = '../boldlypress/plugins/boldlypress-core';
const localCorePath = './plugins/boldlypress-core';

try {
  if (fs.existsSync(localCorePath)) {
    if (fs.existsSync(starterCorePath)) {
      console.log(`Deleting starter core at ${starterCorePath}`);
      // Equivalent to: rm -rf
      rimraf.sync(starterCorePath);

      console.log(`Copying local core to ${starterCorePath}`);

      // Equivalent to: cp -r
      ncp(localCorePath, starterCorePath, function(err) {
        if (err) {
          return console.error(err);
        } else {
          console.log('Done!');
        }
      });
    } else {
      console.error(`Could not find the starter core at ${starterCorePath}. Aborting.`);
    }
  } else {
    console.error(`Could not find the local core at ${localCorePath}. Aborting.`);
  }
} catch (err) {
  console.error(err);
}
