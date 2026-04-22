## Connection & Discovery
This server supports the Model Context Protocol (MCP) and is optimized for autonomous agents.

- **MCP Tools Endpoint:** `https://www.businesshotels.com/mcp-server.php?route=tools`
- **OpenAPI Spec:** [openapi.json](https://www.businesshotels.com/openapi.json)
- **Plugin Manifest:** [.well-known/ai-plugin.json](https://www.businesshotels.com/.well-known/ai-plugin.json)
- **Full API Documentation:** [Tool Configuration](https://www.businesshotels.com/tool-config.html)

## Quick Configuration (Claude/Desktop)
To add this to your local MCP settings:
```json
{
  "mcpServers": {
    "businesshotels-universal-agentic-api": {
      "command": "npx",
      "args": ["-y", "@businesshotels/mcp-server"],
      "env": {
        "BUSINESS_HOTELS_API_KEY": "YOUR_KEY_HERE"
      }
    }
  }
}
