const { Schema, model} = require('mongoose');
const reactionSchema = require('./Reactions');

const thoughtSchema = new Schema (
    {
        thoughtText: {
            type:String, 
            required: true,
            maxLength: 280
        }, 
        createdAt: {
            type: Date, 
            default: Date.now,

        },
        username: {
            type:String, 
            required: true,
        }, 
        reactions:[reactionSchema],
    },
    { 
        toJSON: {
            virtuals: true, 
            getters: true
        }, 
    
        id: false,
    
    }

);

thoughtSchema
.virtual("reactionCount")
//getter
.get(function (){
    return this.reactions.length;
});

//initialize our Thought model
const Thought = model ('thought', thoughtSchema);

moduler.exports= Thought;