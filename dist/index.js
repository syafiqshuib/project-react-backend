import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { Sequelize, DataTypes, Model, Op } from "sequelize";
// Database connection
const sequelize = new Sequelize("postgres://myuser:password@localhost:5432/todo_db");
class Todo extends Model {
}
Todo.init({
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    task: { type: DataTypes.STRING, allowNull: false },
    completed: { type: DataTypes.BOOLEAN, defaultValue: false },
}, {
    sequelize,
    modelName: 'Todo',
});
// GraphQL Schema
const typeDefs = `
  type Todo {
    id: ID!
    task: String!
    completed: Boolean!
  }

  type Query {
    lists: [Todo]
    searchList(task: String!): [Todo]
  }

  type Mutation {
    addList(task: String!): Todo
    updateList(id: ID!): Todo
    deleteList(id: ID!): Boolean
    editList(id: ID!, task: String!): Todo
  }
`;
// This function to add delay
const delay = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};
// Resolvers
const resolvers = {
    Query: {
        lists: async () => {
            return await Todo.findAll({ order: [['id', 'ASC']] });
        },
        searchList: async (_, { task }) => {
            return await Todo.findAll({
                where: { task: { [Op.iLike]: `%${task}%` } },
                order: [['id', 'ASC']]
            });
        }
    },
    Mutation: {
        addList: async (_, { task }) => {
            return Todo.create({ task });
        },
        updateList: async (_, { id }) => {
            const todo = await Todo.findByPk(id);
            if (!todo)
                throw new Error("Todo not found");
            return await todo.update({ completed: !todo.completed });
        },
        deleteList: async (_, { id }) => {
            const deletedCount = await Todo.destroy({ where: { id } });
            return deletedCount > 0;
        },
        editList: async (_, { id, task }) => {
            const todo = await Todo.findByPk(id);
            if (!todo)
                throw new Error("Todo not found");
            return await todo.update({ task });
        },
    },
};
// Server initialization
const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected successfully');
        await sequelize.sync();
        const server = new ApolloServer({ typeDefs, resolvers });
        const { url } = await startStandaloneServer(server, {
            listen: { port: 4000 },
        });
        console.log(`Server ready at: ${url}`);
    }
    catch (error) {
        console.error('Server failed to start:', error);
    }
};
// Start the server
startServer();
