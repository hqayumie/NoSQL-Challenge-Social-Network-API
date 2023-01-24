// Importing Dependencies 
const { Schema, Types } = require('mongoose');
const moment = require('moment');

// Reaction is a subdocument of Thought
const reactionSchema = new Schema({ 
    reactionId: {
        type: Schema.Types.ObjectId,
        // default value is set to a new ObjectId
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    username: {
        type: String,
        required: true
    }, 
    createdAt: {
        type: Date, 
        default: Date.now,
        get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    },
},
{
    toJSON: {
        getters: true
    }
});

module.exports= reactionSchema;