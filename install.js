#!/usr/bin/env node
const inquirer = require('inquirer');
const replace = require('replace-in-file');
const cmd = require('node-cmd');

const asyncCMD = util.promisify(cmd.get);

(async function init() {
  try {
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

    await asyncCMD(`yarn add @ludens-reklame/klosser-theme-${answers.theme}`);

    await replace({
      files: 'sanity.json',
      from: '[appName]',
      to: answers.name
    });

    await replace({
      files: 'resolveProductionUrl.js',
      from: '[appName]',
      to: answers.name
    });

    await replace({
      files: 'sanity.json',
      from: '[projectId]',
      to: answers.projectId
    });

    await replace({
      files: 'schemas/schema.js',
      from: '[theme]',
      to: answers.theme
    });
  } catch (error) {
    console.error(error);
  }
})();
