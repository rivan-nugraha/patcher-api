class UsersDoc {
    getDoc () {
      return {
        "/users/login": {
          post: {
            tags: ["Users"],
            description: "Login user.",
            operationId: "loginUser",
            requestBody: {
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      user_id: {
                        type: "string"
                      },
                      password: {
                        type: "string"
                      }
                    }
                  }
                }
              },
              requred: true
            },
            responses: {}
          }
        },
  
        // Get User All
        "/users/get/all": {
          get: {
            tags: ["Users"],
            description: "Get User All",
            operationId: "getUserAll",
            parameters: [
              {
                name: "x-auth-token",
                in: "header",
                schema: {
                  type: "string"
                },
                required: true
              }
            ],
            responses: {}
          }
        },
  
        // Get User By user_id
        "/users/get/id/{user_id}": {
          get: {
            tags: ["Users"],
            description: "Get User By user_id",
            operationId: "getUserById",
            parameters: [
              {
                name: "x-auth-token",
                in: "header",
                schema: {
                  type: "string"
                },
                required: true
              },
              {
                name: "user_id",
                in: "path",
                schema: {
                  type: "string"
                },
                required: true
              }
            ],
            responses: {}
          }
        },
  
        // Add New User
        "/users/add/user": {
          post: {
            tags: ["Users"],
            description: "Add new user",
            operationId: "addNewUser",
            parameters: [
              {
                name: "x-auth-token",
                in: "header",
                schema: {
                  type: "string"
                },
                required: true
              }
            ],
            requestBody: {
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      user_id: {
                        type: "string"
                      },
                      user_name: {
                        type: "string"
                      },
                      level: {
                        type: "string"
                      },
                      password: {
                        type: "string"
                      },
                      retype_password: {
                        type: "string"
                      }
                    }
                  }
                }
              },
              required: true
            },
            responses: {}
          }
        },
  
        // Update User
        "/users/update/id/{user_id}": {
          put: {
            tags: ["Users"],
            description: "Update data user",
            operationId: "updateDataUser",
            parameters: [
              {
                name: "x-auth-token",
                in: "header",
                schema: {
                  type: "string"
                },
                required: true
              },
              {
                name: "user_id",
                in: "path",
                schema: {
                  type: "string"
                },
                required: true
              }
            ],
            requestBody: {
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      user_name: {
                        type: "string"
                      },
                      level: {
                        type: "string"
                      }
                    }
                  }
                }
              },
              required: true
            },
            responses: {}
          }
        },
  
        // Change Password
        "/users/change-password": {
          put: {
            tags: ["Users"],
            description: "Change password",
            operationId: "changePassword",
            parameters: [
              {
                name: "x-auth-token",
                in: "header",
                schema: {
                  type: "string"
                },
                required: true
              }
            ],
            requestBody: {
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      password: {
                        type: "string"
                      },
                      new_password: {
                        type: "string"
                      },
                      retype_new_password: {
                        type: "string"
                      }
                    }
                  }
                }
              },
              required: true
            },
            responses: {}
          }
        }
  
      };
    }
  }
  
  export default UsersDoc;
  