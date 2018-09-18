#!/usr/bin/env node
const inquirer = require('inquirer');

(async function init() {
  const answers = await inquirer.prompt([
    {
      name: 'name',
      type: 'input',
      message: 'What is the Sanity name?',
      validate: function(value) {
        if (value.length) {
          return true;
        } else {
          return 'Please enter a Sanity name';
        }
      }
    },
    {
      name: 'projectId',
      type: 'input',
      message: 'What is the Sanity project id?',
      validate: function(value) {
        if (value.length) {
          return true;
        } else {
          return 'Please enter a Sanity project id';
        }
      }
    },
    {
      name: 'theme',
      type: 'input',
      message: "What is the theme you're using?",
      validate: function(value) {
        if (value.length) {
          return true;
        } else {
          return 'Please enter a theme name';
        }
      }
    }
  ]);

  console.log({ answers });
})();

async function readAndEdit(opts) {
  let fileData = await readFile(opts.read);

  if (opts.replaceItems && opts.replaceItems.length) {
    for (let replaceItem of opts.replaceItems) {
      fileData = fileData.replace(replaceItem.key, replaceItem.value);
    }
  }

  await writeFile(opts.write, fileData);
}
