import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const createTask = mutation({
  args: { username: v.string(), password: v.string(), ingredients: v.array(values) },
  handler: async (ctx, args) => {
    const taskId = await ctx.db.insert("users", { friends: args.null(),  ingredients: args.ingredients, password: args.password, recipes: args.null(), username: args.username });
  },
});

