# Would You Rather - Serverless App

## Functionality of the application

This application allows users to play the would you rather game by answering and creating questions.

## QUESTION items

The application store QUESTION items, and each QUESTION item contains the following fields:

* `questionId` (string) - a unique id for an item
* `userId` (string) - the user id that created this QUESTION item
* `timestamp` (string) - date and time when an item was created
* `optionOneText` (string) - name of 1st option (e.g. "Win the lottery")
* `optionTwoText` (string) - name of 2nd option (e.g. "Have many friends")
* `optionOneVote` (array) - List of userId(s) who voted for the 1st option
* `optionTwoVote` (array) - List of userId(s) who voted for the 2nd option
* `attachmentUrl` (string) (optional) - a URL pointing to an image attached to a QUESTION item

## Functions implemented

To implement this project, the following functions have been configured: 

* `Auth` - this function implement a custom authorizer for API Gateway that should be added to all other functions.

* `GetQuestions` - return all QUESTIONs for a current user. A user id can be extracted from a JWT token that is sent by the frontend

`GET https://{{apiId}}.execute-api.us-east-1.amazonaws.com/dev/questions`

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

* `CreateQuestion` - create a new QUESTION for a current user. A shape of data send by a client application to this function can be found in the `CreateQuestionRequest.ts` file

```
POST https://{{apiId}}.execute-api.us-east-1.amazonaws.com/dev/questions 
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

All functions are already connected to appropriate events from API Gateway.

An id of a user can be extracted from a JWT token passed by a client.

The `serverless.yml` file includes all of these functions as well as a DynamoDB table and a S3 bucket in the `resources`.

## Backend

## Frontend

To run this app:
`npm run start`