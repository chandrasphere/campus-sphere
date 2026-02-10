import { GoogleGenAI, Type } from "@google/genai";
import { Hostel, MarketInsight, SearchResult, AccommodationType } from '../types';

const apiKey = '';
const ai = new GoogleGenAI({ apiKey });

export const fetchHostelsByCollege = async (collegeName: string): Promise<SearchResult> => {
  if (!apiKey) {
   
    console.warn("No API Key found. Returning mock data.");
    return getMockData(collegeName);
  }

  try {
    const model = 'gemini-2.5-flash';
    const prompt = `
      User wants to find student accommodation (Hostels and PGs) near "${collegeName}".
      Generate a realistic list of 6-9 fictional but plausible hostels/PGs near this college.
      Also generate a "market trend" dataset showing average rental prices for the last 6 months in that area.
      
      Requirements:
      1. Vary the prices, distances (keep them close to the college), and amenities.
      2. Ensure "type" is one of: Hostel, PG, Apartment.
      3. "description" should be catchy and highlight proximity to the college.
      4. "locationSummary" should be a 2-sentence overview of the student living area around ${collegeName}.
    `;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            locationSummary: { type: Type.STRING },
            hostels: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  name: { type: Type.STRING },
                  type: { type: Type.STRING, enum: [AccommodationType.HOSTEL, AccommodationType.PG, AccommodationType.APARTMENT] },
                  pricePerMonth: { type: Type.NUMBER },
                  currency: { type: Type.STRING },
                  distance: { type: Type.STRING },
                  rating: { type: Type.NUMBER },
                  reviewCount: { type: Type.INTEGER },
                  amenities: { type: Type.ARRAY, items: { type: Type.STRING } },
                  description: { type: Type.STRING },
                  availability: { type: Type.INTEGER }
                }
              }
            },
            marketInsights: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  month: { type: Type.STRING },
                  avgPrice: { type: Type.NUMBER }
                }
              }
            }
          }
        }
      }
    });

    if (response.text) {
      const data = JSON.parse(response.text) as SearchResult;
      
      return data;
    }
    
    throw new Error("No data received from Gemini");

  } catch (error) {
    console.error("Gemini API Error:", error);
    return getMockData(collegeName);
  }
};

const getMockData = (collegeName: string): SearchResult => ({
  locationSummary: `The area around ${collegeName} is vibrant with student life, featuring numerous affordable eateries and safe residential blocks.`,
  hostels: [
    {
      id: "1",
      name: "Scholars Inn",
      type: AccommodationType.HOSTEL,
      pricePerMonth: 8500,
      currency: "INR",
      distance: "0.5 km",
      rating: 4.5,
      reviewCount: 120,
      amenities: ["Wifi", "3 meals", "Laundry"],
      description: "Closest hostel to the library gate. Perfect for serious students.",
      availability: 5
    },
    {
      id: "2",
      name: "The Student Hub PG",
      type: AccommodationType.PG,
      pricePerMonth: 12000,
      currency: "INR",
      distance: "1.2 km",
      rating: 4.2,
      reviewCount: 85,
      amenities: ["AC", "Wifi", "Gym", "Attached Washroom"],
      description: "Luxury living with gym access and high-speed internet.",
      availability: 2
    },
    {
      id: "3",
      name: "Green View Residency",
      type: AccommodationType.APARTMENT,
      pricePerMonth: 15000,
      currency: "INR",
      distance: "2.0 km",
      rating: 4.8,
      reviewCount: 40,
      amenities: ["Full Kitchen", "Balcony", "Security"],
      description: "Shared apartments for those who prefer privacy and cooking their own meals.",
      availability: 1
    }
  ],
  marketInsights: [
    { month: "Jan", avgPrice: 9000 },
    { month: "Feb", avgPrice: 9200 },
    { month: "Mar", avgPrice: 8800 },
    { month: "Apr", avgPrice: 9500 },
    { month: "May", avgPrice: 10000 },
    { month: "Jun", avgPrice: 11000 }
  ]
});


export const getGeminiResponse = async (userPrompt: string) => {
  try {
    const model = 'gemini-2.5-flash';
    const result = await ai.models.generateContent({
      model,
      contents: [{ role: 'user', parts: [{ text: userPrompt }] }]
    });
    return result.text || "Bhai, AI busy hai!";
  } catch (error) {
    return "Bhai, search kaam kar raha hai par chatbot busy hai!";
  }
};
