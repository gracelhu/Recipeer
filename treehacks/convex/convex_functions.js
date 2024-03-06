
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
// The .find function will return undefined if it couldn't find the element you're looking for 

// Good reference for how to call these kinds of functions:
// https://github.com/get-convex/convex-demos/blob/main/args-validation/src/App.tsx

// === Reading data === 
export function usernameAndPasswordExists(username, password, users) {
    const user = users.find(user => user.username === username && user.password === password); 
    if(user !== undefined) { return true; }
    else { return false; }
}

export function emailExists(emailAddress, users) {
  const user = users.find(user => user.emailAddress === emailAddress); 
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
    return user ? user.events : []; // now you can access events by index, Ex: graceFriends[indexNumber]
  }

export function getAllergies(username, users) {
    const user = users.find(user => user.username === username);
    return user ? user.allergies : []; // now you can access allergies by index, Ex: graceFriends[indexNumber]
  }


export const userList = query(async (ctx) => {
    return await ctx.db.query("users").collect();
})

// === Writing data === 
export const createUser = mutation({
  args: { username: v.string(), password: v.string(), emailAddress: v.string(), allergies: v.array(v.string()), 
  ingredients: v.array(v.string()), events: v.array(v.string()), usernamesOfFriends: v.array(v.string())},
  handler: async (ctx, args) => {
    console.log("username: " + args.username + ", password: " + args.password + ", emailAddress: " + args.emailAddress);
    const taskId = await ctx.db.insert("users", { username: args.username, password: args.username, 
      emailAddress: args.emailAddress, allergies: args.allergies, ingredients: args.ingredients, events: args.events,
    usernamesOfFriends: args.usernamesOfFriends });
    // do something with `taskId`
  },
});

//  username: '', password: '', email: '', allergies: [], ingredients: [], events: [], usernamesOfFriends: []