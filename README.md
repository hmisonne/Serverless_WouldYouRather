# Would You Rather - Serverless App

## Functionality of the application

This application allows users to play the would you rather game by answering and creating questions. The goal of this project was to build and deploy a serverless application on AWS. To accomplish this task, I built the API using TypeScript and the frontend using the React framework.

## Screens

### Dashboard (Home Screen)

A list of all polls posted is displayed on the home screen. The user can toggle a button to see either the polls that has been answered or unanswered by himself.

### Poll Details

By clicking on vote on one specific poll from the home page, the user is able to vote provided that he has not done so before. There is 2 options for each poll.
Upon voting in a poll, information about how many people voted for one particular option is displayed along with the user's response.

### Submit new polling question

The user can submit a new question by entering 2 options. Once created, the new question will be added  to the unanswered questions of the dashboard.

## About the stack

### Backend Server

The backend is using DynamoDB databases provisioned on the serverless file by AWS. 

#### QUESTION items

The application store QUESTION items, and each QUESTION item contains the following fields:

* `questionId` (string) - a unique id for an item
* `userId` (string) - the user id that created this QUESTION item
* `timestamp` (string) - date and time when an item was created
* `optionOneText` (string) - name of 1st option (e.g. "Win the lottery")
* `optionTwoText` (string) - name of 2nd option (e.g. "Have many friends")
* `optionOneVote` (array) - List of userId(s) who voted for the 1st option
* `optionTwoVote` (array) - List of userId(s) who voted for the 2nd option
* `attachmentUrl` (string) (optional) - a URL pointing to an image attached to a QUESTION item

#### USER information

The application store User information, and each USER item contains the following fields:

* `userId` (string) - a unique id for a user
* `answers` (object) - with the questionId as attribute and the option selected (optionOne or optionTwo) for each answered question. This allows to filter questions for a specific user by "answering status"

## Functions implemented

To implement this project, the following functions have been configured: 

* `Auth` - this function implement a custom authorizer for API Gateway that should be added to all other functions.

### Question API

* `GetQuestions` - return all QUESTIONs for a current user . A user id can be extracted from a JWT token that is sent by the frontend. Receive 2 optional parameters: 
- nextKey: Next key to continue scan operation if necessary
- limit: Maximum number of elements to return

`GET https://{{apiId}}.execute-api.us-east-1.amazonaws.com/dev/questions?limit=2`

It returns data that looks like this:

```json
{
    "items": [
        {
            "optionTwoText": "Go West",
            "optionOneText": "Go East",
            "optionTwoVote": [
                "4551045727"
            ],
            "questionId": "286c3233-a2fa-496a-9bc9-9d8cab3ed5f5",
            "attachmentUrl": "https://serverless-wyr-files-dev.s3.amazonaws.com/286c3233-a2fa-496a-9bc9-9d8cab3ed5f5",
            "userId": "4551045727",
            "timestamp": "2020-06-09T21:58:00.982Z"
        },
        {
            "optionTwoText": "Two things",
            "optionOneText": "One thing",
            "optionTwoVote": [
                "1234567891"
            ],
            "questionId": "91ea0481-e7c3-4b39-83a6-edaf3f2ff46e",
            "userId": "4551045727",
            "attachmentUrl": "https://serverless-wyr-files-dev.s3.amazonaws.com/91ea0481-e7c3-4b39-83a6-edaf3f2ff46e",
            "optionOneVote": [
                "4551045727",
                "1234567891"
            ],
            "timestamp": "2020-06-06T01:47:03.364Z"
        }
    ]
}
```
* `GetQuestion` - return a QUESTION item by userId and by questionId. 

`GET https://{{apiId}}.execute-api.us-east-1.amazonaws.com/dev/users/{userId}/questions/{questionId}`

It returns data that looks like this:

```json
{
    "item": {
        "optionTwoText": "Two things",
        "optionOneText": "One thing",
        "optionTwoVote": [
            "4551045727",
            "5588959907"
        ],
        "questionId": "91ea0481-e7c3-4b39-83a6-edaf3f2ff46e",
        "attachmentUrl": "https://serverless-wyr-files-dev.s3.amazonaws.com/91ea0481-e7c3-4b39-83a6-edaf3f2ff46e",
        "userId": "4551045727",
        "optionOneVote": [
            "4551045123",
        ],
        "timestamp": "2020-06-06T01:47:03.364Z"
    }
}
```


* `CreateQuestion` - create a new QUESTION for a current user. A shape of data send by a client application to this function can be found in the `CreateQuestionRequest.ts` file

`POST https://{{apiId}}.execute-api.us-east-1.amazonaws.com/dev/questions`

```
body: {
	"optionOneText": "Go East",
	"optionTwoText": "Go West"
}
```

It returns a new QUESTION item that looks like this:

```json
{
    "item": {
        "optionTwoText": "Go West",
        "optionOneText": "Go East",
        "questionId": "286c3233-a2fa-496a-9bc9-9d8cab3ed5f5",
        "userId": "4551045727",
        "timestamp": "2020-06-09T21:58:00.982Z"
    }
}
```

* `UpdateQuestion` - update a QUESTION item created by a current user. A shape of data send by a client application to this function can be found in the `UpdateQuestionRequest.ts` file

`PATCH https://{{apiId}}.execute-api.us-east-1.amazonaws.com/dev/users/{userId}/questions/{questionId}`

It receives an object that contains three fields that can be updated in a QUESTION item:

```json
{
  "name": "Buy bread",
  "dueDate": "2019-07-29T20:01:45.424Z",
  "done": true
}
```

The id of an item that is updated is passed as a URL parameter.

It returns an empty body.

* `DeleteQuestion` - delete a QUESTION item created by a current user. Expects an id of a QUESTION item to remove.

It returns an empty body.

* `GenerateUploadUrl` - returns a pre-signed URL that can be used to upload an attachment file for a QUESTION item.

It returns a JSON object that looks like this:

```json
{
  "uploadUrl": "https://s3-bucket-name.s3.eu-west-2.amazonaws.com/image.png"
}
```
### User API

* `createUser` - add a new user to the database:

`POST https://{{apiId}}.execute-api.us-east-1.amazonaws.com/dev/users`

```json
{
    "user": [
        {
            "answers": {},
            "userId": "5588959907"
        }
    ]
}
```

* `getResponsesByUser` - returns user information for a current user using the JWT token that is sent by the frontend.

`GET https://{{apiId}}.execute-api.us-east-1.amazonaws.com/dev/users`

```json
{
    "user": [
        {
            "answers": {
                "286c3233-a2fa-496a-9bc9-9d8cab3ed5f5": "optionOne",
                "286c3233-a2fa-496a-9bc9-9d8cab3ed5f5": "optionTwo"
                },
            "userId": "5588959907"
        }
    ]
}
```



All functions are already connected to appropriate events from API Gateway.

An id of a user can be extracted from a JWT token passed by a client.

The `serverless.yml` file includes all of these functions as well as a DynamoDB table and a S3 bucket in the `resources`.

## Frontend

To run this app:
`npm run start`

