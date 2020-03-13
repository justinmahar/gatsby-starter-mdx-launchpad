const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');
const ncp = require('ncp').ncp;

// This is the directory boldlypress is checked out into
const starterDirName = 'boldlypress';
const starterCorePath = `../${starterDirName}/plugins/boldlypress-core`;
const localCorePath = './plugins/boldlypress-core';
const currentDirectoryName = path.basename(process.cwd());
const isStarterDir = currentDirectoryName === starterDirName;

if (isStarterDir) {
  console.error(
    "ERROR: You're running this command in the starter project. Make sure you run this command from the right place.\n"
  );
} else {
  try {
    const localCoreExists = fs.existsSync(localCorePath);
    const starterCoreExists = fs.existsSync(starterCorePath);
    if (localCoreExists && starterCoreExists) {
      console.log(`  Starter Core => Local Core\n`);
      console.log(`Deleting local core at ${localCorePath}`);
      // Equivalent to: rm -rf
      rimraf.sync(localCorePath);
      console.log(`Copying starter core from ${starterCorePath} to ${localCorePath}`);
      // Equivalent to: cp -r
      ncp(starterCorePath, localCorePath, function(err) {
        if (err) {
          return console.error(err);
        } else {
          console.log('\nDone! Please refresh your editor.\n');
        }
      });
    } else {
      if (!localCoreExists) {
        console.error(`Could not find the local core at ${localCorePath}. Aborting.`);
      }
      if (!starterCoreExists) {
        console.error(`Could not find the starter core at ${starterCorePath}. Aborting.`);
      }
    }
  } catch (err) {
    console.error(err);
  }
}
