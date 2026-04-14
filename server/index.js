const express = require("express")
const { ApolloServer } = require("@apollo/server")
const { expressMiddleware } = require("@as-integrations/express5")
const cors = require("cors")

async function startServer() {
    const app = express();
    const server = new ApolloServer({
        typeDefs: `
        type Todo {
            id: ID!
            title: String!
            completed: Boolean
        }

         type Query {
            getTodos: [Todo]           
        }
        `,
        resolvers: {}
    })

    app.use(express.json());
    app.use(cors());

    await server.start();

    app.use("/graphql", expressMiddleware(server));

    app.listen(8000, () => console.log("Server Started at PORT 8000"));

}
startServer();
