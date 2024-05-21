const {
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLEnumType,
} = require("graphql");
const bcrypt = require("bcrypt");
const Client = require("../models/Client");
const { ClientType } = require("../typeDef/typeDef");
const crypto = require("crypto");

function generateRandomToken(length) {
  return crypto.randomBytes(length).toString("hex");
}

// client account create
const addClient = {
  type: ClientType,
  args: {
    name: { type: GraphQLNonNull(GraphQLString) },
    phone: { type: GraphQLNonNull(GraphQLString) },
    email: { type: GraphQLNonNull(GraphQLString) },
    password: { type: GraphQLNonNull(GraphQLString) },
    image: { type: GraphQLNonNull(GraphQLString) },
    clientType: { type: GraphQLNonNull(GraphQLString) },
  },

  resolve: async (parent, args) => {
    try {
      const client = await Client(args);
      return await client.save();
    } catch (error) {
      throw new Error(error?.message);
    }
  },
};

const addClientImage = {
  type: ClientType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    image: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (parent, args) => {
    try {
      const client = await Client.findByIdAndUpdate(args.id, {
        image: args.image,
      }, {
        new: true,
      });

      if (!client) {
        throw new Error("Client not found");
      }
     
      return client;

    } catch (error) {
      throw new Error(error.message);
    }
  },
}

// client login
const loginClient = {
  type: ClientType,
  args: {
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (parent, { email, password }) => {
    try {
      const client = await Client.findOne({ email });

      if (!client) {
        throw new Error("Invalid email or password");
      }

      const isPasswordValid = await bcrypt.compare(password, client.password);

      if (!isPasswordValid) {
        throw new Error("Invalid email or password");
      }

      return client;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

// update client password
updateClientPassword = {
  type: ClientType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    oldPassword: { type: new GraphQLNonNull(GraphQLString) },
    newPassword: { type: new GraphQLNonNull(GraphQLString) },
  },

  resolve: async (parent, { id, oldPassword, newPassword }) => {
    const client = await Client.findById(id);

    if (!client) {
      throw new Error("client not found");
    }

    const isPasswordValid = await bcrypt.compare(oldPassword, client.password);

    if (!isPasswordValid) {
      throw new Error("Invalid old password");
    }

    if (oldPassword === newPassword) {
      throw new Error("Old password and new password must be different");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    client.password = hashedPassword;

    await client.save();

    return client;
  },
};

// client delete
const deleteClient = {
  type: ClientType,
  args: {
    id: { type: GraphQLNonNull(GraphQLID) },
  },
  resolve: async (parent, args) => {
    try {
      return await Client.findByIdAndDelete(args.id);
    } catch (error) {
      return error;
    }
  },
};

// client forgate password recover

const clientPasswordReset = {
  type: GraphQLString,
  args: {
    email: { type: new GraphQLNonNull(GraphQLString) },
  },
  async resolve(parent, { email }) {
    const client = await Client.findOne({ email });

    if (!client) {
      throw new Error("client not found");
    }

    const resetToken = generateRandomToken(16);

    const resetTokenExpiration = new Date(new Date().getTime() + 3600000);

    client.resetToken = resetToken;
    client.resetTokenExpiration = resetTokenExpiration;

    await client.save();

    //  sendPasswordResetEmail(email,resetToken)

    return "Password reset done, check your mail";
  },
};

const deleteClientWithAdminEnsure = {
  type: ClientType,
  args: {
    id: { type: GraphQLNonNull(GraphQLID) },
    confirmation: { type: GraphQLNonNull(GraphQLBoolean) },
  },
};

const deleteClientWithAdminEnsure2 = async (
  parent,
  { id, confirmation },
  context
) => {
  // Check if the user initiating the deletion is an admin
  if (!context.client || !context.client.admin) {
    throw new Error("Insufficient privileges to delete client.");
  }

  // Check the confirmation field
  if (!confirmation) {
    throw new Error("Confirmation is required to delete the user.");
  }

  try {
    // Perform the deletion logic here (e.g., delete user from the database)
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      throw new Error("User not found.");
    }

    return {
      success: true,
      message: "User deleted successfully.",
    };
  } catch (error) {
    console.error("Error deleting user:", error);
    throw new Error("Failed to delete user.");
  }
};

module.exports = {
  deleteClient,
  addClient,
  loginClient,
  updateClientPassword,
  clientPasswordReset,
  addClientImage,
};
