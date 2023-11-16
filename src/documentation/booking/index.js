
module.exports = {
  "/book": {
    post: {
      security: [
        {
          bearerAuth: [],
        },
      ],
      tags: ["Booking"],
      summary: "Booking",
      description: "Add new booking",
      requestBody: {
        content: {
          "application/json": {
            schema: {
              type: 'object',
              properties: {
                product_type: {
                  type: "string(50)",
                  default: "'holiday' | 'cruise' | 'activity'",
                },
                product_id: {
                  type: "string(255)",
                  default: "id",
                },
                user_id: {
                  type: "string(50)",
                  default: "id",
                },
                meal_preference: {
                  type: "string(50)",
                  default: "String",
                },
                cabin: {
                  type: "string(50)",
                  default: "string",
                },
                participants: {
                  type: "string(50)",
                  default: "Array of objects with name and age",
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "New booking added successfully",
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
    get: {
      security: [
        {
          bearerAuth: [],
        },
      ],
      tags: ["Booking"],
      summary: "Get all booking's",
      description: "Get all booking's",
      parameters: [
        {
          name: "product_type",
          in: "query",
          description: "Product type",
          required: false,
          schema: {
            type: "string",
            enum: [
              'holiday',
              'cruise',
              'activity',
            ]
          }
        },
        {
          name: "user_id",
          in: "query",
          description: "User id",
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
          description: "Booking's successfully retrieved.",
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