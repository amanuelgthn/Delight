import { ID, Query } from "appwrite";

import { INewUser } from "@/types";
import { account, appwriteConfig, avatars, databases } from "./config";


export async function createUserAccount(user: INewUser) {
    try {
        const newAccount = await account.create(
            ID.unique(),
            user.email,
            user.password,
            user.name
        );

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(user.name);

    const newUser = await saveUserToDB({
        accountId: newAccount.$id,
        name: newAccount.name,
        email: newAccount.email,
        username: user.username,
        imageUrl: avatarUrl
    }
    );
        return newUser;
    }catch (error) {
        console.log(error);
        return error;
    }
}

export async function saveUserToDB(user: {
    accountId: string;
    email: string;
    name: string;
    imageUrl: URL;
    username?: string;
}) {
    try {
        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            user,
        )

        return newUser;
    } catch (error) {
        console.log(error);
    }
}

export async function SignInAccount(user: { email: string; password: string; }) {
    console.log(user.email, user.password);
    try {
        const session = account.createEmailPasswordSession(user.email, user.password);
        session.then(function (response) {
            console.log(response);})// Succes
            return session;
    } catch (error) {
        console.log("Error creating");
        console.log(error);
    }
}


export async function getCurrentUser() {
    try {
        const currentAccount = await account.get();
        console.log(currentAccount.$id);
        if(!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )
        console.log("currentUser");
        console.log(currentUser);
        if(!currentUser) throw Error;

        return currentUser.documents[0];
    } catch (error) {
        console.log("herecomes the error");
        console.log(error);
    }
}