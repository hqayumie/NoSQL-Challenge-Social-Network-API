const { Schema, model } = require('mongoose');

// Schema to create User model
const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
        },
        thoughts: [{
            type: Schema.Types.ObjectID,
            ref: "Thought",
        }],
        friends: [{
            type: Schema.Types.ObjectID,
            ref: "User",
        }],
    },
    {
        toJson: {
            virtuals: true,
        },
        id: false,
    }
);

userSchema
.virtual("friendCount")
//getter
.get(function (){
    return this.friends.length;
});

// Initialize our User model
const User = model('user', userSchema);

module.exports = User;