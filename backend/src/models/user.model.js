import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		select: false,
	},
	password: {
		type: String,
		required: true,
		select: false,
	},
});

const User = mongoose.model("User", userSchema);

export default User;
