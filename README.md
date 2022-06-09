# SQL Query Runner

This web app helps you run and instantly view the results of your queries, there's a mock database that you can view
and then send SQL commands to. You can either make your own query or use one of the predefined queries.

Note: currently only select and from commands can be used e.g select \* from customers.

This is a work in progress the 'Where' statement will be available soon

Live Site: https://sql-query-runner.netlify.app/

## I used **React** and the following packages:

1. [create-react-app](https://www.npmjs.com/package/create-react-app)
2. [Material UI](https://www.npmjs.com/package/material-ui)
3. [react-papaparse](https://react-papaparse.js.org/)

## Page Load Time

this app has a page load time of 271ms, i used [pingdom](https://tools.pingdom.com/#604414dd70400000) to check this

## Optimisations Made

1.  i fetched and processed the data for the database after the page loads to greatly reduce page load time
2.  i used views instead of pages to avoid unnecesary page redirects
