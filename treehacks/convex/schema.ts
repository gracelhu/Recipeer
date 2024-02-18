import { defineSchema, defineTable} from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  recipeer: defineTable({
    username: v.string(),
    password: v.string(),
    ingredients: v.array(v.string()),
    usernamesOfFriends: v.array(v.string()), 
    events: v.array(v.object({name: v.string(), date: v.string(), time: v.string(), peopleAttending: v.array(v.string()), 
      recipes: v.string()})),
  })
});