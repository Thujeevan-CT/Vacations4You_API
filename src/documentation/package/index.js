
module.exports = {
  "/package/new": {
    get: {
      security: [
        {
          bearerAuth: [],
        },
      ],
      tags: ["Package"],
      summary: "Add new package",
      description: "Add new package",
      parameters: [
        {
          "name": "title",
          "in": "query",
          "description": "title",
          "required": true,
          "schema": {
            "type": "string",
            "format": "title"
          }
        },
        {
          "name": "description",
          "in": "query",
          "description": "description",
          "required": true,
          "schema": {
            "type": "string",
            "format": "description"
          }
        },
        {
          "name": "destination",
          "in": "query",
          "description": "destination",
          "required": true,
          "schema": {
            "type": "string",
            "format": "destination"
          }
        },
        {
          "name": "duration",
          "in": "query",
          "description": "duration",
          "required": true,
          "schema": {
            "type": "string",
            "format": "duration"
          }
        },
        {
          "name": "no_of_travelers",
          "in": "query",
          "description": "no of travelers",
          "required": true,
          "schema": {
            "type": "string",
            "format": "no of travelers"
          }
        },
        {
          "name": "price",
          "in": "query",
          "description": "price",
          "required": true,
          "schema": {
            "type": "string",
            "format": "price"
          }
        },
        {
          "name": "specialty",
          "in": "query",
          "description": "specialty",
          "required": true,
          "schema": {
            "type": "string",
            "format": "specialty"
          }
        },
      ],
      responses: {
        200: {
          description: "New package added successfully",
        },
        400: {
          description: "errors to show in front end",
        },
        401: {
          description: "Token not provided or Expired",
        },
        500: {
          description: "server error try agin in a couple of mins",
        },
      },
    },
  },
}; 