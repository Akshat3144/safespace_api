export class MemStorage {
    constructor() {
        this.users = new Map();
        this.properties = new Map();
        this.neighborhoods = new Map();
        this.compareLists = new Map();
        this.userCurrentId = 1;
        this.propertyCurrentId = 1;
        this.neighborhoodCurrentId = 1;
        this.compareListCurrentId = 1;
        // Initialize with sample data
        this.initializeSampleData();
    }
    // User methods
    async getUser(id) {
        return this.users.get(id);
    }
    async getUserByUsername(username) {
        return Array.from(this.users.values()).find((user) => user.username === username);
    }
    async createUser(insertUser) {
        const id = this.userCurrentId++;
        const user = { ...insertUser, id };
        this.users.set(id, user);
        return user;
    }
    // Property methods
    async getProperties(filters) {
        let properties = Array.from(this.properties.values());
        if (filters) {
            properties = properties.filter((property) => {
                for (const [key, value] of Object.entries(filters)) {
                    if (property[key] !== value) {
                        return false;
                    }
                }
                return true;
            });
        }
        return properties;
    }
    async getProperty(id) {
        return this.properties.get(id);
    }
    async createProperty(insertProperty) {
        const id = this.propertyCurrentId++;
        const property = { ...insertProperty, id };
        this.properties.set(id, property);
        return property;
    }
    // Neighborhood methods
    async getNeighborhoods(city, state) {
        let neighborhoods = Array.from(this.neighborhoods.values());
        if (city && state) {
            neighborhoods = neighborhoods.filter((n) => n.city === city && n.state === state);
        }
        else if (city) {
            neighborhoods = neighborhoods.filter((n) => n.city === city);
        }
        else if (state) {
            neighborhoods = neighborhoods.filter((n) => n.state === state);
        }
        return neighborhoods;
    }
    async getNeighborhood(id) {
        return this.neighborhoods.get(id);
    }
    async getNeighborhoodByName(name, city, state) {
        return Array.from(this.neighborhoods.values()).find((n) => n.name === name && n.city === city && n.state === state);
    }
    async createNeighborhood(insertNeighborhood) {
        const id = this.neighborhoodCurrentId++;
        const neighborhood = { ...insertNeighborhood, id };
        this.neighborhoods.set(id, neighborhood);
        return neighborhood;
    }
    // Compare list methods
    async getCompareList(userId) {
        return Array.from(this.compareLists.values()).filter((item) => item.userId === userId);
    }
    async addToCompareList(insertCompareItem) {
        const id = this.compareListCurrentId++;
        const compareItem = { ...insertCompareItem, id };
        this.compareLists.set(id, compareItem);
        return compareItem;
    }
    async removeFromCompareList(id) {
        this.compareLists.delete(id);
    }
    initializeSampleData() {
        // Portland neighborhoods
        const neighborhoods = [
            {
                name: "Alameda",
                city: "Portland",
                state: "OR",
                hdiScore: 0.89,
                policeResponse: 3,
                fireResponse: 4,
                medicalResponse: 6,
                hospitalDistance: 1.2,
                shelterDistance: 3.5,
                safetyLevel: "high",
                latitude: 45.546,
                longitude: -122.635,
                aqi: 28,
                aqiText: "Excellent",
                floodRisk: "Low",
                earthquakeRisk: "Medium",
            },
            {
                name: "Pearl District",
                city: "Portland",
                state: "OR",
                hdiScore: 0.82,
                policeResponse: 2,
                fireResponse: 3,
                medicalResponse: 4,
                hospitalDistance: 0.8,
                shelterDistance: 1.2,
                safetyLevel: "high",
                latitude: 45.526,
                longitude: -122.684,
                aqi: 42,
                aqiText: "Good",
                floodRisk: "Medium",
                earthquakeRisk: "Medium",
            },
            {
                name: "Irvington",
                city: "Portland",
                state: "OR",
                hdiScore: 0.85,
                policeResponse: 3,
                fireResponse: 5,
                medicalResponse: 5,
                hospitalDistance: 1.5,
                shelterDistance: 2.8,
                safetyLevel: "high",
                latitude: 45.543,
                longitude: -122.653,
                aqi: 35,
                aqiText: "Good",
                floodRisk: "Low",
                earthquakeRisk: "Low",
            },
            {
                name: "Laurelhurst",
                city: "Portland",
                state: "OR",
                hdiScore: 0.79,
                policeResponse: 4,
                fireResponse: 6,
                medicalResponse: 7,
                hospitalDistance: 2.2,
                shelterDistance: 4.1,
                safetyLevel: "medium",
                latitude: 45.528,
                longitude: -122.625,
                aqi: 45,
                aqiText: "Good",
                floodRisk: "Low",
                earthquakeRisk: "Low",
            },
            {
                name: "Sellwood",
                city: "Portland",
                state: "OR",
                hdiScore: 0.72,
                policeResponse: 7,
                fireResponse: 8,
                medicalResponse: 9,
                hospitalDistance: 4.2,
                shelterDistance: 6.5,
                safetyLevel: "medium",
                latitude: 45.472,
                longitude: -122.652,
                aqi: 65,
                aqiText: "Moderate",
                floodRisk: "Medium",
                earthquakeRisk: "Medium",
            },
        ];
        neighborhoods.forEach((n) => {
            const neighborhood = {
                ...n,
                id: this.neighborhoodCurrentId++,
            };
            this.neighborhoods.set(neighborhood.id, neighborhood);
        });
        // Properties
        const properties = [
            {
                title: "Modern Townhome in Grant Park",
                address: "123 NE Knott St",
                city: "Portland",
                state: "OR",
                zipCode: "97212",
                price: 625000,
                beds: 3,
                baths: 2.5,
                sqft: 1850,
                propertyType: "House",
                imageUrl: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=600&q=80",
                safetyScore: 8.5,
                latitude: 45.535,
                longitude: -122.639,
                airQuality: 42,
                airQualityText: "Good",
                hdiScore: 0.82,
                emergencyResponseTime: 5,
                floodRisk: "Medium",
                floodZone: "Zone B",
                createdAt: new Date().toISOString(),
            },
            {
                title: "Renovated Craftsman in Alameda",
                address: "2418 NE Alameda St",
                city: "Portland",
                state: "OR",
                zipCode: "97212",
                price: 875000,
                beds: 4,
                baths: 3,
                sqft: 2450,
                propertyType: "House",
                imageUrl: "https://images.unsplash.com/photo-1592595896551-12b371d546d5?auto=format&fit=crop&w=600&q=80",
                safetyScore: 9.2,
                latitude: 45.546,
                longitude: -122.635,
                airQuality: 28,
                airQualityText: "Excellent",
                hdiScore: 0.89,
                emergencyResponseTime: 3,
                floodRisk: "Low",
                floodZone: "Zone X",
                createdAt: new Date().toISOString(),
            },
            {
                title: "Luxury Condo in Pearl District",
                address: "1122 NW Marshall St",
                city: "Portland",
                state: "OR",
                zipCode: "97209",
                price: 720000,
                beds: 2,
                baths: 2,
                sqft: 1350,
                propertyType: "Apartment",
                imageUrl: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=600&q=80",
                safetyScore: 8.8,
                latitude: 45.526,
                longitude: -122.684,
                airQuality: 38,
                airQualityText: "Good",
                hdiScore: 0.82,
                emergencyResponseTime: 4,
                floodRisk: "Low",
                floodZone: "Zone X",
                createdAt: new Date().toISOString(),
            },
            {
                title: "Historic Home in Irvington",
                address: "1845 NE 15th Ave",
                city: "Portland",
                state: "OR",
                zipCode: "97212",
                price: 950000,
                beds: 5,
                baths: 3.5,
                sqft: 3200,
                propertyType: "House",
                imageUrl: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=600&q=80",
                safetyScore: 8.7,
                latitude: 45.537,
                longitude: -122.651,
                airQuality: 35,
                airQualityText: "Good",
                hdiScore: 0.85,
                emergencyResponseTime: 4,
                floodRisk: "Low",
                floodZone: "Zone X",
                createdAt: new Date().toISOString(),
            },
            {
                title: "Sellwood Bungalow",
                address: "8722 SE 13th Ave",
                city: "Portland",
                state: "OR",
                zipCode: "97202",
                price: 550000,
                beds: 3,
                baths: 2,
                sqft: 1650,
                propertyType: "House",
                imageUrl: "https://images.unsplash.com/photo-1576941089067-2de3c901e126?auto=format&fit=crop&w=600&q=80",
                safetyScore: 7.2,
                latitude: 45.472,
                longitude: -122.652,
                airQuality: 65,
                airQualityText: "Moderate",
                hdiScore: 0.72,
                emergencyResponseTime: 8,
                floodRisk: "Medium",
                floodZone: "Zone B",
                createdAt: new Date().toISOString(),
            },
        ];
        properties.forEach((p) => {
            const property = { ...p, id: this.propertyCurrentId++ };
            this.properties.set(property.id, property);
        });
    }
}
export const storage = new MemStorage();
