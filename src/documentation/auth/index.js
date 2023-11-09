
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
      parameters: [
        {
          "name": "first_name",
          "in": "query",
          "description": "first name",
          "required": true,
          "schema": {
            "type": "string",
            "format": "first name"
          }
        },
        {
          "name": "last_name",
          "in": "query",
          "description": "last name",
          "required": true,
          "schema": {
            "type": "string",
            "format": "last name"
          }
        },
        {
          "name": "email",
          "in": "query",
          "description": "email",
          "required": true,
          "schema": {
            "type": "string",
            "format": "email"
          }
        },
        {
          "name": "confirm_email",
          "in": "query",
          "description": "confirm email",
          "required": true,
          "schema": {
            "type": "string",
            "format": "email"
          }
        },
        {
          "name": "password",
          "in": "query",
          "description": "password",
          "required": true,
          "schema": {
            "type": "string",
            "format": "password"
          }
        },
        {
          "name": "confirm_password",
          "in": "query",
          "description": "confirm password",
          "required": true,
          "schema": {
            "type": "string",
            "format": "password"
          }
        },
        {
          name: "role",
          in: "query",
          description: "user role",
          required: false,
          schema: {
            type: "string",
            enum: [
              'staff',
              'agent'
            ]
          }
        }
      ],
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
      parameters: [
        {
          "name": "email",
          "in": "query",
          "description": "email",
          "required": true,
          "schema": {
            "type": "string",
            "format": "email"
          }
        },
        {
          "name": "password",
          "in": "query",
          "description": "password",
          "required": true,
          "schema": {
            "type": "string",
            "format": "password"
          }
        }
      ],
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
      parameters: [
        {
          "name": "email",
          "in": "query",
          "description": "email",
          "required": true,
          "schema": {
            "type": "string",
            "format": "email"
          }
        }
      ],
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
        },
        {
          name: "old_password",
          in: "query",
          description: "old password",
          required: true,
          schema: {
            type: "string",
            format: "password"
          }
        },
        {
          name: "new_password",
          in: "query",
          description: "new password",
          required: true,
          schema: {
            type: "string",
            format: "password"
          }
        },
        {
          name: "confirm_password",
          in: "query",
          description: "confirm password",
          required: true,
          schema: {
            type: "string",
            format: "password"
          }
        },
      ],
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
      parameters: [
        {
          name: "token",
          in: "query",
          description: "token",
          required: true,
          schema: {
            type: "string",
            format: "token"
          }
        },
        {
          name: "new_password",
          in: "query",
          description: "new password",
          required: true,
          schema: {
            type: "string",
            format: "password"
          }
        },
        {
          name: "confirm_password",
          in: "query",
          description: "confirm password",
          required: true,
          schema: {
            type: "string",
            format: "password"
          }
        },
      ],
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