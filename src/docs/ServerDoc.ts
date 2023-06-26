import { any } from "joiful";

class ServerDoc {
  getInfo () {
    return {
      openapi: "3.0.1",
      info: {
        version: "1.0.0",
        title: "BE Base ",
        description: "Rest API BE Base",
        termsOfService: "http://api_url/terms/",
        contact: {
          name: "Irvan Nugraha",
          email: "piksi.irvan.18402043@gmail.com",
          url: "https://feliex1992.github.io"
        },
        license: {
          name: "MIT",
          url: "https://opensource.org/licenses/MIT"
        }
      },
      servers: [
        {
          url: "http://localhost:7001/api/v1",
          description: "Local server"
        },
        {
          url: "http://192.168.1.16:7001/api/v1",
          description: "Network server"
        }
      ],
      security: [
        {
          ApiKeyAuth: any
        }
      ],
      tags: [
        {
          name: "Users",
          description: "End point users."
        }
      ]
    };
  }
}

export default ServerDoc;
