[ ![Codeship Status for chriscantu/team-sync-api-js](https://codeship.com/projects/a803a6a0-b946-0132-4da1-525e2ea92bd0/status?branch=master)](https://codeship.com/projects/71576)

# team-sync-api-js
IOjs version of the Team Sync API for comparison

## Dependencies
* Rethink DB installed & running locally
* IOjs 1.3 or higher

## RethinkDB Setup
* Install RethinkDB locally
* Create db 'teamsync'
* Create Tables 'statuses'

## Project Setup
* `git clone git@github.com:chriscantu/team-sync-node.git`
* `cd team-sync-node`
* `npm install`

## Running the project
This project is setup to run tasks via NPM. The full lists of tasks can be found in the package.json file in the `scripts` section.

Additionally, rethinkdb must be running locally on its default ports.  

## Project Commands
* Running the project:  `npm run dev`
* Running the unit tests:  `npm run test`
