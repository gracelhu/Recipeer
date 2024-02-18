import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

Event: defineTable({
  name: v.string(),
  date: v.string(),
  peopleAttending: v.array(v.string()),
  recipes: v.string(),
});

export default defineSchema({
  recipeer: defineTable({
    username: v.string(),
    password: v.string(),
    ingredients: v.array(v.string()),
    usernamesOfFriends: v.array(v.string()), 
    events: v.array(Event),
  })
});