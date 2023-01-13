const { User } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
    Query: {
      me: async (parent, args, context) => {
        if (context.user) {
          const userData = await User.findOne({ _id: context.user._id }).select('-__v -password');
          return userData;
        }
      },
    },
  
    Mutation: {

        addUser: async (parent, args) => {
            try {
              const user = await User.create(args);
      
              const token = signToken(user);
              return { token, user };
            } catch (err) {
              console.log(err);
            }
          },
          login: async (parent, { email, password }) => {
            try{

                const user = await User.findOne({ email })
                const token = signToken(user)
                return { token, user }

            } catch (err) {
              console.log(err);
            } 
        },
        saveBook: async (parent, args, context) => {
                if (context.user) {
                    const updatedUser = await User.findByIdAndUpdate(
                        { _id: context.user._id },
                        { $addToSet: { savedBooks: args.input } },
                        { new: true }
                    )
                    return updatedUser
                }
            }
        },
        // removeBook: async (parent, args, context) => {
        //     if (context.user) {
        //         const updatedUser = await User.findByIdAndUpdate(
        //             { _id: context.user._id },
        //             { $pull: { savedBooks: { bookId: args.bookId } } },
        //             { new: true }
        //         )
        //         return updatedUser
        //     }
        // },
  };
  
  module.exports = resolvers;