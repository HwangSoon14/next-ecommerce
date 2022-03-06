import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String, required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user',
    },
    root: {
        type: Boolean,
        default: false,
    },
    avatar: {
        type: String,
        default: 'https://th.bing.com/th/id/R.671ad41c4dee19bf2634551bd6b10297?rik=THGL4iCpBjKMpQ&riu=http%3a%2f%2fwww.nzasianleaders.com%2fwp-content%2fuploads%2fdefault-avatar.jpg&ehk=lmPQ78hkERVbp7zfg5vN7g1qf3jMZ%2feDS5UeyJ%2bk4Cw%3d&risl=&pid=ImgRaw&r=0'
    }
}, { timestamps: true})

let Dataset = mongoose.models.user || mongoose.model('user' , userSchema)
export default Dataset; 