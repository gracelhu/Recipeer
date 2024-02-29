
import { mutation } from "./_generated/server";
import { v } from "convex/values";
// The .find function will return undefined if it couldn't find the element you're looking for 

// === Reading data === 
export function userExists(username, password, users) {
    const user = users.find(user => user.username === username && user.password === password); 
    if(user !== undefined) { return true; }
    else { return false; }
}

export function getIngredients(username, users) {
    const user = users.find(user => user.username === username);
    return user ? user.ingredients : []; // now you can access ingredients by index, Ex: graceIngredients[indexNumber]
  }

export function getFriends(username, users) {
    const user = users.find(user => user.username === username);
    return user ? user.usernamesOfFriends : []; // now you can access friends by index, Ex: graceFriends[indexNumber]
  }

export function getEvents(username, users) {
    const user = users.find(user => user.username === username);
    return user ? user.events : []; // now you can access friends by index, Ex: graceFriends[indexNumber]
  }

// === Writing data === 
export const createUser = mutation({
  args: { username: v.string(), password: v.string(), emailAddress: v.string() },
  handler: async (ctx, args) => {
    console.log("meow");
    console.log("username: " + args.username + ", password: " + args.password + ", emailAddress: " + args.emailAddress);
    const taskId = await ctx.db.insert("users", { username: args.username, password: args.username, emailAddress: args.emailAddress });
    // do something with `taskId`
  },
});

// The convex db schema:

/*
recipeer: defineTable({
    events: v.array(
      v.object({
        date: v.string(),
        name: v.string(),
        peopleAttending: v.array(v.string()),
        recipes: v.string(),
        time: v.string(),
      })
    ),
    ingredients: v.array(v.string()),
    password: v.string(),
    username: v.string(),
    emailAddress: v.string(),
    usernamesOfFriends: v.array(v.string()),
  }),
*/