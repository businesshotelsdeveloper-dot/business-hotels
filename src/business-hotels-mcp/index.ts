import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

/**
 * Initialize the BusinessHotels MCP Server
 */
const server = new Server(
  {
    name: "business-hotels-mcp",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

/**
 * Tool Listing:
 * This tells the AI what capabilities are available.
 */
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "get_live_hotel_rates",
        description: "Get live hotel rates by hotel name, dates, adults, and currency.",
        inputSchema: {
          type: "object",
          properties: {
            hotelName: {
              type: "string",
              description: "Full hotel name, ideally with city/state/country."
            },
            checkinDate: {
              type: "string",
              description: "Check-in date (YYYY-MM-DD)"
            },
            checkoutDate: {
              type: "string",
              description: "Check-out date (YYYY-MM-DD)"
            },
            adults: {
              type: "integer",
              minimum: 1,
              default: 2
            },
            currency: {
              type: "string",
              default: "USD"
            }
          },
          required: ["hotelName", "checkinDate", "checkoutDate"]
        }
      }
    ]
  };
});

/**
 * Tool Execution:
 * This is where you will eventually add the fetch() call to your 
 * PHP endpoint: https://www.businesshotels.com/mcp-server.php
 */
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === "get_live_hotel_rates") {
    // Logic for calling your API will go here
    return {
      content: [
        {
          type: "text",
          text: "Hotel rate search initialized for " + request.params.arguments?.hotelName
        }
      ]
    };
  }
  throw new Error("Tool not found");
});

/**
 * Start the server using Standard Input/Output (STDIO)
 */
const transport = new StdioServerTransport();
await server.connect(transport);
