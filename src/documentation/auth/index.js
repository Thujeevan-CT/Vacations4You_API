
module.exports = {
  "/auth/refresh-token": {
    get: {
      security: [
        {
          bearerAuth: [],
        },
      ],
      tags: ["Auth"],
      summary: "Refresh token",
      description: "User refresh token",
      responses: {
        200: {
          description: "User belong token generate successfully",
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
  "/auth/register": {
    post: {
      tags: ["Auth"],
      summary: "Invite user",
      description: "Invite user",
      requestBody: {
        content: {
          "application/json": {
            schema: {
              type: 'object',
              properties: {
                first_name: {
                  type: "string(50)",
                  default: "John",
                },
                last_name: {
                  type: "string(50)",
                  default: "doe",
                },
                email: {
                  type: "string(50)",
                  default: "admin@vacation4u.com",
                },
                confirm_email: {
                  type: "string(50)",
                  default: "admin@vacation4u.com",
                },
                password: {
                  type: "string(50)",
                  default: "123456Abc",
                },
                confirm_password: {
                  type: "string(50)",
                  default: "Abc123123",
                },
                role: {
                  type: "string(50)",
                  default: "agent",
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "user invited successfully",
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
  "/auth/login": {
    post: {
      tags: ["Auth"],
      summary: "User login",
      description: "Login user",
      requestBody: {
        content: {
          "application/json": {
            schema: {
              type: 'object',
              properties: {
                email: {
                  type: "string(50)",
                  default: "admin@vacation4u.com",
                },
                password: {
                  type: "string(50)",
                  default: "123456Abc",
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "user logged in successfully",
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
  "/auth/forgot-password": {
    post: {
      tags: ["Auth"],
      summary: "Get token for password reset session",
      description: "Get token for password reset session",
      requestBody: {
        content: {
          "application/json": {
            schema: {
              type: 'object',
              properties: {
                email: {
                  type: "string(50)",
                  default: "admin@vacation4u.com",
                }
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Get token link successfully",
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
  "/auth/change-password/{id}": {
    put: {
      security: [
        {
          bearerAuth: [],
        },
      ],
      tags: ["Auth"],
      summary: "User password change",
      description: "User password change",
      parameters: [
        {
          name: "id",
          in: "path",
          description: "user id",
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
                old_password: {
                  type: "string(50)",
                  default: "123456Abc",
                },
                new_password: {
                  type: "string(50)",
                  default: "Abc123123",
                },
                confirm_password: {
                  type: "string(50)",
                  default: "Abc123123",
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "user password changed successfully",
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
  "/auth/reset-password": {
    put: {
      tags: ["Auth"],
      summary: "User reset password",
      description: "User reset password",
      requestBody: {
        content: {
          "application/json": {
            schema: {
              type: 'object',
              properties: {
                token: {
                  type: "string(50)",
                  default: "token",
                },
                new_password: {
                  type: "string(50)",
                  default: "Abc123123",
                },
                confirm_password: {
                  type: "string(50)",
                  default: "Abc123123",
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "user verified successfully",
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