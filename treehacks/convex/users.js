import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { query } from "./_generated/server";

export const createUser = mutation({
  args: { username: v.string(), password: v.string(), ingredients: v.array(v.string()), friends: v.string(), recipes: v.string() },
  handler: async (ctx, args) => {
    const taskId = await ctx.db.insert("users", { friends: args.friends,  ingredients: args.ingredients, password: args.password, recipes: args.recipes, username: args.username });
  },
});

export const userList = query(async (ctx) => {
  return await ctx.db.query("users").collect();
})

// export const getUser = query({
//     args: { username: v.string()},
//     handler: async (ctx, args) => {
//         return await ctx.db
//         .query("users")
//         .filter((q) => q.eq(q.field("username"), args.username)).collect().first();
//       },
// });

