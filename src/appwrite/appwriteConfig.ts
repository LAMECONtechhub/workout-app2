import { Client, Account, Databases, ID } from "appwrite";

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1") // Your API Endpoint
  .setProject("64786a09b0a3705c74db"); // Your project ID

export const account = new Account(client);
export const database = new Databases(client);
export const id = ID.unique();
export const database_id = "647fc983bdbd2f23a363";
export const user_collection = "647fc9906400af8cc88a";
export const pr_collection = "6487951535a155e971ad";
export const workout_Collection = "6488a1810f4fd43d0274";
export const exercise_Collection = "6488a2cf0c52733105ea";
