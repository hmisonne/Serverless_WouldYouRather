# Would You Rather Project

This application allows users to play a "Would You Rather" game! This project is part of the Udacity React NanoDegree Program. The goal of this project is to build a React/Redux front-end app from scratch and to improve the predictability of the application’s state using Redux. Establishing strict rules for getting, listening, and updating the store; and identifying what state should live inside of Redux and what state should live inside of React components.

This project was bootstraped with [Create React App](https://github.com/facebook/create-react-app).

![WouldYouRather Demo](demo/wouldyourather.gif)

## Functionalities

Before being able to use this application, users are prompted to log in. They can do so by selecting a user from a dropdown menu.
Once logged in, users can navigate between screens to perform actions. Currently there are 4 screens as described below.

## Screens

### Dashboard (Home Screen)

A list of all polls posted is displayed on the home screen. The user can toggle a button to see either the polls that has been answered or unanswered by himself.

### Poll Details

By clicking on vote on one specific poll from the home page, the user is able to vote provided that he has not done so before. There is 2 options for each poll.
Upon voting in a poll, information about how many people voted for one particular option is displayed along with the user's response.

### Submit new polling question

The user can submit a new question by entering 2 options. Once created, the new question will be automatically added on top of the unanswered questions of the dashboard.

### Leaderboard

See the ranking of users on the leaderboard

## Getting started

### Pre-requisites and Local Development

Developers using this project should already have node installed on their local machines.

## About the stack

### Frontend Server

To run this app, on your terminal, cd to 02_would_you_rather_app :

install all project dependencies with `npm install`
start the development server with `npm start`
Open the `localhost:3000` to view the App in development mode on the local server.

### Backend Server

Currently, there is no backend server setup. The `_DATA.js` file represents a fake database and methods to access the data.

## Acknowledgements

I want to thank Udacity for providing the framework and guidelines for this great project.
