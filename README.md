# Readable

This project is part of the Udacity React NanoDegree Program.
The goal of this project is to build the front end of a Content and comment web application using React and Redux. 

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

![Readable Demo](demo/demo.gif)

## App functionalities

On this app, Users are able to post content to predefined categories, comment on their posts and other users' posts, and vote on posts and comments. Users are be able to edit and delete posts and comments.

## Getting started

### Pre-requisites and Local Development

Developers using this project should already have node installed on their local machines.

## About the stack

### Frontend Server

To run this app, on your terminal, cd to 04_Readable :

* install all project dependencies with `npm install`
* start the development server with `npm start`

Open the `localhost:3000` to view the front end App in development mode on the local server.

### Backend Server

A local backend development server has already been provided for this project. It is a simple server built in Node.
The server's endpoints contains the methods  to perform the following operations: manage storing, reading, updating, and deleting data for our application.

* Install and start the API server
    - `cd backend/api-server`
    - `npm install`
    - `node server`

Open the `localhost:3001/` to view the backend local server.
Information about the API server and how to use it can be found in its [README file](backend/api-server/README.md) (provided by Udacity).

## Data
There are three types of objects stored on the server:

Categories: Categories are simple objects containing a name and a URL path
Posts: Posts are the building blocks of our application
Comments: Comments are attached to parent posts

## Authentification
This application is anonymous, with _no_ authentication or authorization. There are no user objects, and comments and posts accept any username/name for creation and editing.

## Views

### Default (Root)

- List all available categories, which link to a category view for that category
- List all of the posts
- Display the number of comments associated with the post.

Actions:
- Change the sort method for the list, including order by voteScore and order by timestamp
- Add a new post
- Increment or decrement the voteScore of posts

### Category View

- Identical to the default view, but filtered to only include posts with the selected category

### Post Detail View

- Show the details of a post, including: Title, Body, Author, timestamp (in user readable format), and vote score
- List all of the comments for that post

Actions:
- Edit or delete the post
- Add a new comment.
- Edit or delete comments
- Increment or decrement the voteScore of the post

### Create/Edit View

- Form to create new post or edit existing posts
when editing, existing data is populated in the form

## Acknowledgements

I want to thank Udacity for providing the framework and guidelines for this great project.