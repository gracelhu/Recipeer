
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

export const getIngredientListOfUser = query({
    args: { username: v.string() },
    handler: async (ctx, args) => {
      console.log("inside getIngredientListOfUser");
      console.log("username: " + args.username);
      const users = await ctx.db.query("users").filter((q) => q.eq(q.field("username"), args.username)).collect();
      console.log("users[0].username: " + users[0].username);
      console.log("users[0].ingredients: " + users[0].ingredients);
      return users[0].ingredients;
    },
  });

  export const getFriendsOfUser = query({
    args: { username: v.string() },
    handler: async (ctx, args) => {
      console.log("inside getFriendsOfUser");
      console.log("username: " + args.username);
      const users = await ctx.db.query("users").filter((q) => q.eq(q.field("username"), args.username)).collect();
      console.log("users[0].username: " + users[0].username);
      console.log("users[0].usernamesOfFriends: " + users[0].ingredients);
      return users[0].usernamesOfFriends;
    },
  })

  export const getEventsOfUser = query({
    args: { username: v.string() },
    handler: async (ctx, args) => {
      console.log("inside getEventsOfUser");
      console.log("username: " + args.username);
      const users = await ctx.db.query("users").filter((q) => q.eq(q.field("username"), args.username)).collect();
      console.log("users[0].username: " + users[0].username);
      console.log("users[0].usernamesOfFriends: " + users[0].events);
      return users[0].events;
    },
  })

export function getEvents(username, users) {
    const user = users.find(user => user.username === username);
    return user ? user.events : []; // now you can access events by index, Ex: graceFriends[indexNumber]
  }

export function getAllergies(username, users) {
    const user = users.find(user => user.username === username);
    return user ? user.allergies : []; // now you can access allergies by index, Ex: graceFriends[indexNumber]
  }

export const getUserIdByUsername = query({
  args: { username: v.string() },
  handler: async (ctx, args) => {
    const users = await ctx.db.query("users").filter((q) => q.eq(q.field("username"), args.username)).collect();
    return users[0]._id; 
  },
});

export const userList = query(async (ctx) => {
    return await ctx.db.query("users").collect();
})

// === Writing data === 
export const createUser = mutation({
  args: { username: v.string(), password: v.string(), emailAddress: v.string(), allergies: v.array(v.string()), 
  ingredients: v.array(v.string()), events: v.array(v.string()), usernamesOfFriends: v.array(v.string())},
  handler: async (ctx, args) => {
    console.log("username: " + args.username + ", password: " + args.password + ", emailAddress: " + args.emailAddress);
    await ctx.db.insert("users", { username: args.username, password: args.password, 
      emailAddress: args.emailAddress, allergies: args.allergies, ingredients: args.ingredients, events: args.events,
    usernamesOfFriends: args.usernamesOfFriends });
  },
});

//  username: '', password: '', email: '', allergies: [], ingredients: [], events: [], usernamesOfFriends: []


// Need to write:

export const addIngredientsForUser = mutation({
  args: { username: v.string(), newIngredients: v.array(v.string())},
  handler: async (ctx, args) => {
    console.log('inside addIngredientsForUser');
    const userId = await getUserIdByUsername(ctx, { username: args.username });
    const ingredientList = await getIngredientListOfUser(ctx, {username: args.username });
    const newIngredientList = ingredientList.concat(args.newIngredients);
    await ctx.db.patch(userId, { ingredients: newIngredientList});
  },
});

// event format: [name, date, time, friends invited, dishes, ingredients needed]
export const addEventForUser = mutation({
  args: { username: v.string(), newEvent: v.array(v.array(v.any()))},
  handler: async (ctx, args) => {
    console.log('inside addEventForUser');
    const userId = await getUserIdByUsername(ctx, { username: args.username });
    const eventList = await getEventsOfUser(ctx, {username: args.username });
    const newEventList = eventList.concat(args.newEvent);
    await ctx.db.patch(userId, { events: newEventList });
  },
});

// deleteUserIngredient 

// modifyUserIngredient 

// addUserFriend

// deleteUserFriend 

// addUserEvent

// deleteUserEvent

// addUserAllergy

// deleteUserAllergy 

// addUserSavedRecipe

// deleteUserSavedRecipe 

