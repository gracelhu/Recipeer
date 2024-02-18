import { query } from "./_generated/server";
import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const createUser = mutation(async (ctx, { username, password, ingredients, usernamesOfFriends, events }) => {
    const user = { username, password, ingredients, usernamesOfFriends, events};
    await ctx.db.insert("recipeer", user);
  });

  export const userList = query(async (ctx) => {
    return await ctx.db.query("recipeer").collect();
  });