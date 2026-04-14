const express = require("express")
const { ApolloServer } = require("@apollo/server")
const { expressMiddleware } = require("@as-integrations/express5")
const cors = require("cors")
const { default: axios } = require("axios");

async function startServer() {
    const app = express();
    const server = new ApolloServer({
        typeDefs: `
        type Todo {
            id: ID!
            title: String!
            completed: Boolean
        }

         type User {
            id: ID!
            name: String!
            username: String!
            email: String!
            phone: String!
            website: String!
        }

        type Query {
            getTodos: [Todo]
            getAllUsers: [User]
        }
        `,
        resolvers: {
            Query: {
                getTodos: async () => (
                    await axios.get("https://jsonplaceholder.typicode.com/todos")
                ).data,
                getAllUsers: async () => (
                    await axios.get("https://jsonplaceholder.typicode.com/users")
                ).data,

            }
        }
    })

    app.use(express.json());
    app.use(cors());

    await server.start();

    app.use("/graphql", expressMiddleware(server));

    app.listen(8000, () => console.log("Server Started at PORT 8000"));

}
startServer();
