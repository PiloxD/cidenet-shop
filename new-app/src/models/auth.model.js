const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new Schema(
    {
        typedocument: {
            type: String,
            unique: false
        },
        document: {
            type: Number,
            unique: true
        },
        name: {
            type: String,
            unique: false
        },
        lastname: {
            type: String,
            unique: false
        },
        email: {
            type: String,
            unique: true

        },
        password: {
            type: String,
            required: true
        },
        roles: [
            {
                ref: "Role",
                type: Schema.Types.ObjectId
            }]



    }, {
    timestamps: true,
    versionKey: false
}
);

userSchema.statics.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)

}
userSchema.statics.comparePassword = async (password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword)
}


module.exports = model('User2', userSchema);

