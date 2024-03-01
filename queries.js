import { Client, Databases, Query } from "appwrite";

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('65d76b408f1e56e7822c');

const databases = new Databases(client);

databases.listDocuments(
    '65d79bf1eabb493ce9d9',
    '65d79d0d14c028a16c5c',
    [
        Query.equal('accountId', '65e1e6a7d18765e0a6dd'),
    ]
);


// databases.then(function (response) {
//     console.log(response); // Success
// }, function (error) {
//     console.log(error); // Failure
// });
