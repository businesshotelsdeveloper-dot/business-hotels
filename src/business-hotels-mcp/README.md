# BusinessHotels Universal Agentic API (MCP)

This is the official [Model Context Protocol (MCP)](https://github.com/modelcontextprotocol) server for **BusinessHotels.com**. It provides autonomous AI agents with real-time access to live hotel inventory, rates, and booking capabilities.

## Connection & Discovery
This server is optimized for autonomous agents and "Bleisure" (business + leisure) travel workflows.
- **MCP Tools Configuration:** https://www.businesshotels.com/mcp-server.php?route=config
- **MCP Tools Endpoint:** https://www.businesshotels.com/mcp-server.php?route=tool
- **OpenAPI Spec:** [openapi.json](https://www.businesshotels.com/openapi.json)
- MCP Discovery Spec: https://www.businesshotels.com/.well-known/mcp.json
- **Plugin Manifest:** [.well-known/ai-plugin.json](https://www.businesshotels.com/.well-known/ai-plugin.json)
- **Full API Documentation:** [Tool Configuration](https://www.businesshotels.com/tool-config.html)

## Quick Configuration (Claude/Desktop)
To add the Universal Agentic API to your local MCP settings, paste this into your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "businesshotels-universal-agentic-api": {
      "command": "npx",
      "args": ["-y", "@businesshotels/mcp-server"],
      "env": {
        "BUSINESS_HOTELS_API_KEY": "test-live-hotel-rates2025"
      }
    }
  }
}


// QUICK TEST - Browser DevTools Console (F12 → Console) → paste and hit Enter
// Note: This API key is for testing and light production. 
// Contact ai@businesshotels.com for high-volume or full production access.

fetch("https://www.businesshotels.com/mcp-server.php?route=tools/get_live_hotel_rates", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "X-API-KEY": "test-live-hotel-rates2025"
  },
  body: JSON.stringify({
    hotelName: "Luxor, Las Vegas, NV, US",
    checkinDate: "2026-07-15",
    checkoutDate: "2026-07-16",
    adults: 2,
    currency: "USD"
  })
}).then(r => r.json()).then(data => {
  console.log("✅ Hotel:", data.hotel_name);
  console.log("💰 Price:", `$${data.rates.display_all_in_total} ${data.rates.currency}`);
  console.log("🔗 Book:", data.booking_page_live_rates);
  console.log("📊 Score:", data.best_match_score);
  console.log("Full response:", data);
});
