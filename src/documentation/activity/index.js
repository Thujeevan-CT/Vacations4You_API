
module.exports = {
  "/activity/new": {
    post: {
      security: [
        {
          bearerAuth: [],
        },
      ],
      tags: ["Activity"],
      summary: "Add new activity",
      description: "Add new activity",
      requestBody: {
        content: {
          "application/json": {
            schema: {
              type: 'object',
              properties: {
                activity_type: {
                  type: "string(50)",
                  default: "title",
                },
                description: {
                  type: "string(255)",
                  default: "description",
                },
                destination: {
                  type: "string(50)",
                  default: "destination",
                },
                date: {
                  type: "string(50)",
                  default: "String format",
                },
                age_restriction: {
                  type: "string(50)",
                  default: "number",
                },
                price: {
                  type: "string(50)",
                  default: "90",
                },
                image: {
                  type: "string(255)",
                  default: "Base 64 format string",
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "New activity added successfully",
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
  "/activity": {
    get: {
      security: [
        {
          bearerAuth: [],
        },
      ],
      tags: ["Activity"],
      summary: "Get all activity's",
      description: "Get all activity's",
      parameters: [
        {
          name: "price",
          in: "query",
          description: "price",
          type: "string",
        },
        {
          name: "rating",
          in: "query",
          description: "rating",
          type: "string",
        },
        {
          name: "page_size",
          in: "query",
          description: "Page size",
          type: "string",
        },
        {
          name: "page",
          in: "query",
          description: "Page",
          type: "string",
        },
      ],
      responses: {
        200: {
          description: "Activity's successfully retrieved.",
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
    }
  },
  "/activity/{id}": {
    get: {
      security: [
        {
          bearerAuth: [],
        },
      ],
      tags: ["Activity"],
      summary: "Get single activity",
      description: "Get single activity",
      parameters: [
        {
          name: "id",
          in: "path",
          description: "Activity id",
          required: true,
          type: "string",
        },
      ],
      responses: {
        200: {
          description: "Activity successfully retrieved.",
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
    }
  },
  "/activity/update/{id}": {
    put: {
      security: [
        {
          bearerAuth: [],
        },
      ],
      tags: ["Activity"],
      summary: "Update activity",
      description: "Update activity",
      parameters: [
        {
          name: "id",
          in: "path",
          description: "activity id",
          required: true,
          type: "string",
        }
      ],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              type: 'object',
              properties: {
                activity_type: {
                  type: "string(50)",
                  default: "title",
                },
                description: {
                  type: "string(255)",
                  default: "description",
                },
                destination: {
                  type: "string(50)",
                  default: "destination",
                },
                date: {
                  type: "string(50)",
                  default: "String format",
                },
                age_restriction: {
                  type: "string(50)",
                  default: "number",
                },
                price: {
                  type: "string(50)",
                  default: "90",
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Activity updated successfully",
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
  "/activity/delete/{id}": {
    delete: {
      security: [
        {
          bearerAuth: [],
        },
      ],
      tags: ["Activity"],
      summary: "Delete single activity",
      description: "Delete single activity",
      parameters: [
        {
          name: "id",
          in: "path",
          description: "Activity id",
          required: true,
          type: "string",
        },
      ],
      responses: {
        200: {
          description: "Activity successfully deleted.",
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
    }
  },
}; 