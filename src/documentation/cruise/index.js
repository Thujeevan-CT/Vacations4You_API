
module.exports = {
  "/cruise/meals-cabins": {
    get: {
      security: [
        {
          bearerAuth: [],
        },
      ],
      tags: ["Cruise"],
      summary: "Get Meals preferences and cabins data",
      description: "Get Meals preferences and cabins data",
      responses: {
        200: {
          description: "Meals preferences and cabins successfully retrieved.",
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
  "/cruise/new": {
    post: {
      security: [
        {
          bearerAuth: [],
        },
      ],
      tags: ["Cruise"],
      summary: "Add new cruise",
      description: "Add new cruise",
      requestBody: {
        content: {
          "application/json": {
            schema: {
              type: 'object',
              properties: {
                title: {
                  type: "string(50)",
                  default: "title",
                },
                departure_destination: {
                  type: "string(50)",
                  default: "departure destination",
                },
                arrival_destination: {
                  type: "string(50)",
                  default: "arrival destination",
                },
                departure_date: {
                  type: "string(50)",
                  default: "String format",
                },
                arrival_date: {
                  type: "string(50)",
                  default: "String format",
                },
                cabin_class: {
                  type: "string(50)",
                  default: "Class number",
                },
                cruise_duration: {
                  type: "string(50)",
                  default: "duration in hours",
                },
                cruise_provider: {
                  type: "string(50)",
                  default: "cruise provider",
                },
                price: {
                  type: "string(50)",
                  default: "90000",
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "New cruise added successfully",
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
  "/cruise": {
    get: {
      security: [
        {
          bearerAuth: [],
        },
      ],
      tags: ["Cruise"],
      summary: "Get all cruise's",
      description: "Get all cruise's",
      parameters: [
        {
          name: "price",
          in: "query",
          description: "price",
          type: "string",
        },
        {
          name: "cruise_duration",
          in: "query",
          description: "cruise_duration",
          type: "string",
        },
        {
          name: "cruise_provider",
          in: "query",
          description: "cruise_provider",
          type: "string",
        },
      ],
      responses: {
        200: {
          description: "Cruise's successfully retrieved.",
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
  "/cruise/{id}": {
    get: {
      security: [
        {
          bearerAuth: [],
        },
      ],
      tags: ["Cruise"],
      summary: "Get single cruise",
      description: "Get single cruise",
      parameters: [
        {
          name: "id",
          in: "path",
          description: "Cruise id",
          required: true,
          type: "string",
        },
      ],
      responses: {
        200: {
          description: "Cruise successfully retrieved.",
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
  "/cruise/update/{id}": {
    put: {
      security: [
        {
          bearerAuth: [],
        },
      ],
      tags: ["Cruise"],
      summary: "Update cruise",
      description: "Update cruise",
      parameters: [
        {
          name: "id",
          in: "path",
          description: "cruise id",
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
                title: {
                  type: "string(50)",
                  default: "title",
                },
                departure_destination: {
                  type: "string(50)",
                  default: "departure destination",
                },
                arrival_destination: {
                  type: "string(50)",
                  default: "arrival destination",
                },
                departure_date: {
                  type: "string(50)",
                  default: "departure date timestamp",
                },
                arrival_date: {
                  type: "string(50)",
                  default: "arrival date timestamp",
                },
                cabin_class: {
                  type: "string(50)",
                  default: "Class number",
                },
                cruise_duration: {
                  type: "string(50)",
                  default: "cruise duration hours",
                },
                cruise_provider: {
                  type: "string(50)",
                  default: "cruise provider",
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
          description: "Cruise updated successfully",
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
  "/cruise/delete/{id}": {
    delete: {
      security: [
        {
          bearerAuth: [],
        },
      ],
      tags: ["Cruise"],
      summary: "Delete single cruise",
      description: "Delete single cruise",
      parameters: [
        {
          name: "id",
          in: "path",
          description: "Cruise id",
          required: true,
          type: "string",
        },
      ],
      responses: {
        200: {
          description: "Cruise successfully deleted.",
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