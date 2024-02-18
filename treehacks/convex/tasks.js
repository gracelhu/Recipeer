import { query } from "./_generated/server";
import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("tasks").collect();
  },
});

export const createTask = mutation(async (ctx, { text, isCompleted }) => {
    const task = { text, isCompleted };
    await ctx.db.insert("tasks", task);
  });

  export const createUser = mutation(async (ctx, { username, password, ingredients, usernamesOfFriends }) => {
    const user = { username, password, ingredients, usernamesOfFriends};
    await ctx.db.insert("recipeer", user);
  });

