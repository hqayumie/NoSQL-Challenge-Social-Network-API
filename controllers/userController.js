const { User, Thought } = require('../models');

const userController = {
    // Get all users
    getUsers(req, res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },
    // Get a single user
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .select('-__v')
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with that ID' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    // create a new user
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },

    //update user - add code below
    updateUser(req, res) {
        User.findOneAndUpdate({ _id: req.params.userId }, { $set: req.body }, { new: true, runValidators: true })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with that ID' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));

    },

    // Delete a user and associated thoughts
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with that ID' })
                    : Thought.deleteMany({ _id: { $in: user.thoughts } })
            )
            .then(() => res.json({ message: 'User and thoughts deleted!' }))
            .catch((err) => res.status(500).json(err));
    },


    //add friend/ post new friend to a users friend list
    addFriend(req, res) {
        User.findOneAndUpdate({ _id: req.params.userId }, { runValidators: true, new: true }, { $addToSet: { friends: req.params.friendId } })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user found with this ID' })
                    : res.json(user)
            )

            .catch((err) => res.status(500).json(err));
    },

    //delete a friend from user using userID
    deleteFriend(req, res) {
        User.findOneAndUpdate({ _id: params.id }, { $pull: { friends: params.friendId } }, { runValidators: true, new: true })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "No user found with this ID" })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
};


module.exports = userController;

