import { Client, Account } from "appwrite";

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('65d76b408f1e56e7822c');                 // Your project ID

const account = new Account(client);

const promise = account.createEmailPasswordSession('letme@gmail.com', '9gxdfKVD6fq@QT3');

promise.then(function (response) {
    console.log(response); // Success
}, function (error) {
    console.log(error); // Failure
});