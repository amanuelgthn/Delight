import { Client, Account, Databases, Storage, Avatars } from 'appwrite';

export const appwriteConfig = {
    // projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
    // url: import.meta.env.VITE_APPWRITE_URL,
    // databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    // storageId: import.meta.env.VITE_APPWRITE_STORAGE_ID,
    // userCollectionId: import.meta.env.VITE_APPWRITE_USER_COLECTION_ID,
    // postCollectionId: import.meta.env.VITE_APPWRITE_POST_COLLECTION_ID,
    // savesCollectionId: import.meta.env.VITE_APPWRITE_SAVES_COLLECTION_ID,
    projectId: '65e0a35eb7f315686702',
    url: 'https://cloud.appwrite.io/v1',
    databaseId: '65e0a4622457c45d808f',
    storageId: '65e0ad5d37ca594b1dc2',
    userCollectionId: '65e0a46d7d9463dc5a82',
    postCollectionId: '65e0a87bd2818d3bfab3',
    savesCollectionId: '65e0a9a2079db85b06a3',
}

const client =  new Client();
client
    .setProject(appwriteConfig.projectId)
    .setEndpoint(appwriteConfig.url)
;

export const account =  new Account(client);
export const databases =  new Databases(client);
export const storage =  new Storage(client);
export const avatars =  new Avatars(client);

