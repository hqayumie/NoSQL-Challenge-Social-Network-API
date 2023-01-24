const { User, Thought} = require('../models');

module.exports = {
  // Get all thoughts
  getAllThoughts(req, res) {
    User.find()
      .then((courses) => res.json(courses))
      .catch((err) => res.status(500).json(err));
  },

  //get one thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No though found with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  //Create a new thought and push the created thought's _id to the associated user's thoughts array field

  createThought(req, res) {
    Thought.create(req.body)
        .then(({_id}) => {
            return User.findOneAndUpdate({ _id: req.body.userId },{ $push: { thoughts: _id } },{ new: true });
        })
        .then((thought)=>
        !thought
        ? res.status(404).json({ message: "No thought found with this ID!" })
        : res.json(thought)
        )
        .catch ((err) => {res.status(500).json(err)});
    },

//Update a thought by ID

updateThought(req, res) {
    Thought.findOneAndUpdate({ _id: req.params.thoughtId },{ $set: req.body },{ runValidators: true, new: true })
        .then((thought) =>
            !thought
                ? res.status(404).json({ message: "No thought found with this ID!" })
                : res.json(thought)
                )
            .catch((err) => {res.status(500).json(err)});

},
            //Delete a thought

            deleteThought(req, res) {
                Thought.findOneAndDelete({ _id: req.params.thoughtId })
                    .then((thought) =>
                        !thought
                            ? res.status(404).json({ message: "No thought with this ID!" })
                            : User.findOneAndUpdate( { thoughts: req.params.thoughtId },{ $pull: { thoughts: req.params.thoughtId } },{ new: true })
                            )
                            .then((user) =>
                                !user
                                    ? res.status(404).json({
                                        message: "Thought deleted but no user with this id!",
                                    })
                                    : res.json({ message: "Thought successfully deleted!" })
                            )
                            .catch((err) => res.status(500).json(err));
                    },
//add reaction
                    addReaction(req, res) {
                        Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $pull: { reactions: req.body } },{ new: true })
                            .then((thought) =>
                                !thought
                                    ? res.status(404).json({ message: "No thought with this ID!" })
                                    : res.json(thought)
                            )
                            .catch((err) => res.status(500).json(err));
                    },
                    
                    //delete reaction
                    deleteReaction(req, res) {
                        Thought.findOneAndUpdate({ _id: req.params.thoughtId },{ $pull: { reactions: { reactionId: req.params.reactionId } } },{ new: true })
                            .then((thought) =>
                                !thought
                                    ? res.status(404).json({ message: "No thought with this ID!" })
                                    : res.json(thought)
                            )
                            .catch((err) => res.status(500).json(err));
                    },
                };