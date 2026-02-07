import mongoose from "mongoose";

const confessionSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    confession: {
        type: String,
        required: true,
    },
    response: {
        type: String,
        required: true,
    },
    audioUrl: {
        type: String, // Optional: if we store generated audio later
    },
}, {
    timestamps: true,
});

const Confession = mongoose.model("Confession", confessionSchema);

export default Confession;
