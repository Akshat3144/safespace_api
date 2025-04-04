import { pgTable, text, serial, integer, real, } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    username: text("username").notNull().unique(),
    password: text("password").notNull(),
});
export const properties = pgTable("properties", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    address: text("address").notNull(),
    city: text("city").notNull(),
    state: text("state").notNull(),
    zipCode: text("zip_code").notNull(),
    price: integer("price").notNull(),
    beds: integer("beds").notNull(),
    baths: real("baths").notNull(),
    sqft: integer("sqft").notNull(),
    propertyType: text("property_type").notNull(),
    imageUrl: text("image_url"),
    safetyScore: real("safety_score").notNull(),
    latitude: real("latitude").notNull(),
    longitude: real("longitude").notNull(),
    airQuality: integer("air_quality"),
    airQualityText: text("air_quality_text"),
    hdiScore: real("hdi_score"),
    emergencyResponseTime: integer("emergency_response_time"),
    floodRisk: text("flood_risk"),
    floodZone: text("flood_zone"),
    createdAt: text("created_at").notNull(),
});
export const neighborhoods = pgTable("neighborhoods", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    city: text("city").notNull(),
    state: text("state").notNull(),
    hdiScore: real("hdi_score").notNull(),
    policeResponse: integer("police_response").notNull(),
    fireResponse: integer("fire_response").notNull(),
    medicalResponse: integer("medical_response").notNull(),
    hospitalDistance: real("hospital_distance").notNull(),
    shelterDistance: real("shelter_distance").notNull(),
    safetyLevel: text("safety_level").notNull(),
    latitude: real("latitude").notNull(),
    longitude: real("longitude").notNull(),
    aqi: integer("aqi"),
    aqiText: text("aqi_text"),
    floodRisk: text("flood_risk"),
    earthquakeRisk: text("earthquake_risk"),
});
export const compareList = pgTable("compare_list", {
    id: serial("id").primaryKey(),
    userId: integer("user_id").notNull(),
    propertyId: integer("property_id").notNull(),
    addedAt: text("added_at").notNull(),
});
export const insertUserSchema = createInsertSchema(users).pick({
    username: true,
    password: true,
});
export const insertPropertySchema = createInsertSchema(properties).omit({
    id: true,
});
export const insertNeighborhoodSchema = createInsertSchema(neighborhoods).omit({
    id: true,
});
export const insertCompareListSchema = createInsertSchema(compareList).omit({
    id: true,
});
