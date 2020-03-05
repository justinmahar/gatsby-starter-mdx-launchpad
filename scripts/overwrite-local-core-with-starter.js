const fs = require('fs');
const rimraf = require('rimraf');
const ncp = require('ncp').ncp;

const starterCorePath = '../boldlypress/plugins/boldlypress-core';
const localCorePath = './plugins/boldlypress-core';

try {
  if (fs.existsSync(starterCorePath)) {
    if (fs.existsSync(localCorePath)) {
      console.log(`Deleting local core at ${localCorePath}`);
      // Equivalent to: rm -rf
      rimraf.sync(localCorePath);
    }

    console.log(`Copying starter core to ${localCorePath}`);

    // Equivalent to: cp -r
    ncp(starterCorePath, localCorePath, function(err) {
      if (err) {
        return console.error(err);
      } else {
        console.log('Done!');
      }
    });
  } else {
    console.error(`Could not find the starter core at ${starterCorePath}. Aborting.`);
  }
} catch (err) {
  console.error(err);
}
