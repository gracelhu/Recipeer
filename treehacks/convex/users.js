import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const createUser = mutation({
  args: { username: v.string(), password: v.string(), ingredients: v.array(v.string()), friends: v.string(), recipes: v.string() },
  handler: async (ctx, args) => {
    const taskId = await ctx.db.insert("users", { friends: args.friends,  ingredients: args.ingredients, password: args.password, recipes: args.recipes, username: args.username });
  },
});

