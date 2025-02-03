import { Client, Account, ID, Avatars, Databases, Query } from 'react-native-appwrite';

export const config = {
    endpoint: "https://cloud.appwrite.io/v1",
    platform: "com.torrez.aora",
    projectId: "679ff6b7003a9cee9c56",
    databaseId: "679ff7de002848c8cc6b",
    userCollectionId: "679ff801003a0c2d353b",
    videoCollectionId: "679ff8a5003983cf1314",
    storageId: "679ffa23001b6003a2a0"
}

const client = new Client()
    .setEndpoint(config.endpoint)
    .setProject(config.projectId)
    .setPlatform(config.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (email: string, password: string, username: string) => {
    try {
        const response = await account.create(ID.unique(), email, password, username);
        if(!response) throw new Error("Error creating user");

        const avatarUrl = avatars.getInitials(username);

        await signIn(email, password);

        const newUser = await databases.createDocument(
            config.databaseId, 
            config.userCollectionId, 
            ID.unique(), 
            {
                accountId: response.$id,
                avatar: avatarUrl,
                username,
                email
            }
        )

        return newUser;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const signIn = async (email: string, password: string) => {
    try {
        const session = await account.createEmailPasswordSession(email, password);
        if(!session) throw new Error("Error signing in");

        return session;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const getCurrentUser = async () => {
    try {
        const user = await account.get();

        if(!user) throw new Error("Error getting user");

        const currentUser = await databases.listDocuments(
            config.databaseId, 
            config.userCollectionId, 
            [Query.equal('accountId', user.$id)]
        )

        if(!currentUser) throw new Error("Error getting user");

        return currentUser.documents[0];
    } catch (error) {
        console.log(error);
    }
}
