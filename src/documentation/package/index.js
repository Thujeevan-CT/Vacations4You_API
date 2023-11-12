
module.exports = {
  "/package/new": {
    post: {
      security: [
        {
          bearerAuth: [],
        },
      ],
      tags: ["Package"],
      summary: "Add new package",
      description: "Add new package",
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
                description: {
                  type: "string(50)",
                  default: "description",
                },
                destination: {
                  type: "string(50)",
                  default: "destination",
                },
                duration: {
                  type: "string(50)",
                  default: "4",
                },
                no_of_travelers: {
                  type: "string(50)",
                  default: "2",
                },
                price: {
                  type: "string(50)",
                  default: "90",
                },
                specialty: {
                  type: "string(50)",
                  default: "Family Holiday",
                },
              },
            },
          },
        },
      },
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
  "/package": {
    get: {
      security: [
        {
          bearerAuth: [],
        },
      ],
      tags: ["Package"],
      summary: "Get all Package's",
      description: "Get all Package's",
      responses: {
        200: {
          description: "Package's successfully retrieved.",
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
  "/package/{id}": {
    get: {
      security: [
        {
          bearerAuth: [],
        },
      ],
      tags: ["Package"],
      summary: "Get single Package",
      description: "Get single Package",
      parameters: [
        {
          name: "id",
          in: "path",
          description: "Package id",
          required: true,
          type: "string",
        },
      ],
      responses: {
        200: {
          description: "Package successfully retrieved.",
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
  "/package/update/{id}": {
    put: {
      security: [
        {
          bearerAuth: [],
        },
      ],
      tags: ["Package"],
      summary: "Update package",
      description: "Update package",
      parameters: [
        {
          name: "id",
          in: "path",
          description: "Package id",
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
                description: {
                  type: "string(50)",
                  default: "description",
                },
                destination: {
                  type: "string(50)",
                  default: "destination",
                },
                duration: {
                  type: "string(50)",
                  default: "4",
                },
                no_of_travelers: {
                  type: "string(50)",
                  default: "2",
                },
                price: {
                  type: "string(50)",
                  default: "90",
                },
                specialty: {
                  type: "string(50)",
                  default: "Family Holiday",
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Package updated successfully",
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
  "/package/delete/{id}": {
    delete: {
      security: [
        {
          bearerAuth: [],
        },
      ],
      tags: ["Package"],
      summary: "Delete single Package",
      description: "Delete single Package",
      parameters: [
        {
          name: "id",
          in: "path",
          description: "Package id",
          required: true,
          type: "string",
        },
      ],
      responses: {
        200: {
          description: "Package successfully deleted.",
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