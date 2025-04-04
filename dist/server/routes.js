import { createServer } from "http";
import { storage } from "./storage.js";
import { insertPropertySchema, insertNeighborhoodSchema, insertCompareListSchema, } from "../shared/schema.js";
import { z } from "zod";
export async function registerRoutes(app) {
    // Properties endpoints
    app.get("/api/properties", async (req, res) => {
        try {
            // Extract filter parameters
            const { city, state, propertyType, minPrice, maxPrice, minHdi } = req.query;
            // Get all properties
            let properties = await storage.getProperties();
            // Apply filters
            if (city) {
                properties = properties.filter((p) => p.city === city);
            }
            if (state) {
                properties = properties.filter((p) => p.state === state);
            }
            if (propertyType) {
                properties = properties.filter((p) => p.propertyType === propertyType);
            }
            if (minPrice) {
                properties = properties.filter((p) => p.price >= Number(minPrice));
            }
            if (maxPrice) {
                properties = properties.filter((p) => p.price <= Number(maxPrice));
            }
            if (minHdi) {
                properties = properties.filter((p) => p.hdiScore !== undefined && p.hdiScore >= Number(minHdi));
            }
            res.json(properties);
        }
        catch (error) {
            res.status(500).json({ error: "Failed to fetch properties" });
        }
    });
    app.get("/api/properties/:id", (async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const property = await storage.getProperty(id);
            if (!property) {
                return res.status(404).json({ error: "Property not found" });
            }
            res.json(property);
        }
        catch (error) {
            res.status(500).json({ error: "Failed to fetch property" });
        }
    }));
    app.post("/api/properties", (async (req, res) => {
        try {
            const validatedData = insertPropertySchema.parse(req.body);
            const property = await storage.createProperty(validatedData);
            res.status(201).json(property);
        }
        catch (error) {
            if (error instanceof z.ZodError) {
                return res.status(400).json({ error: error.errors });
            }
            res.status(500).json({ error: "Failed to create property" });
        }
    }));
    // Neighborhoods endpoints
    app.get("/api/neighborhoods", async (req, res) => {
        try {
            const { city, state } = req.query;
            const neighborhoods = await storage.getNeighborhoods(city, state);
            res.json(neighborhoods);
        }
        catch (error) {
            res.status(500).json({ error: "Failed to fetch neighborhoods" });
        }
    });
    app.get("/api/neighborhoods/:id", (async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const neighborhood = await storage.getNeighborhood(id);
            if (!neighborhood) {
                return res.status(404).json({ error: "Neighborhood not found" });
            }
            res.json(neighborhood);
        }
        catch (error) {
            res.status(500).json({ error: "Failed to fetch neighborhood" });
        }
    }));
    app.post("/api/neighborhoods", (async (req, res) => {
        try {
            const validatedData = insertNeighborhoodSchema.parse(req.body);
            const neighborhood = await storage.createNeighborhood(validatedData);
            res.status(201).json(neighborhood);
        }
        catch (error) {
            if (error instanceof z.ZodError) {
                return res.status(400).json({ error: error.errors });
            }
            res.status(500).json({ error: "Failed to create neighborhood" });
        }
    }));
    // Compare list endpoints
    app.get("/api/compare/:userId", async (req, res) => {
        try {
            const userId = parseInt(req.params.userId);
            const compareList = await storage.getCompareList(userId);
            // Fetch property details for each comparison item
            const propertyIds = compareList.map((item) => item.propertyId);
            const propertiesInList = [];
            for (const id of propertyIds) {
                const property = await storage.getProperty(id);
                if (property) {
                    propertiesInList.push(property);
                }
            }
            res.json(propertiesInList);
        }
        catch (error) {
            res.status(500).json({ error: "Failed to fetch compare list" });
        }
    });
    app.post("/api/compare", (async (req, res) => {
        try {
            const validatedData = insertCompareListSchema.parse(req.body);
            const compareItem = await storage.addToCompareList(validatedData);
            res.status(201).json(compareItem);
        }
        catch (error) {
            if (error instanceof z.ZodError) {
                return res.status(400).json({ error: error.errors });
            }
            res.status(500).json({ error: "Failed to add property to compare list" });
        }
    }));
    app.delete("/api/compare/:id", async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            await storage.removeFromCompareList(id);
            res.status(204).send();
        }
        catch (error) {
            res
                .status(500)
                .json({ error: "Failed to remove property from compare list" });
        }
    });
    const httpServer = createServer(app);
    return httpServer;
}
