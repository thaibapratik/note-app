import UserModel from "../models/user.model.js";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";


export const getAuthenticatedUser = async (req, res, next) => {
	try {
		const decoded = jwt.verify(req.cookies.token, process.env.SECRET_KEY);
		if (!decoded) {
			throw createHttpError(401, "Invalid token");
		}

		const user = await userModel.findById(decoded.id).select("+email");

		res.status(200).json(user);

	} catch (error) {
		next(error);
	}
}

export const signup = async (req, res, next) => {
	try {
		const { username, email } = req.body;
		const passwordRaw = req.body.password;

		if (!username || !email || !passwordRaw) {
			throw createHttpError(400, "All fields are required");
		}


		const existingUsername = await UserModel.findOne({ username });
		if (existingUsername) {
			throw createHttpError(409, "This username already exists. Choose a unique username.");
		}

		const existingEmail = await UserModel.findOne({ email });
		if (existingEmail) {
			throw createHttpError(409, "This email already exists. Choose a unique email.");
		}


		const passwordHashed = await bcrypt.hash(passwordRaw, 10);

		const user = await UserModel.create({
			username,
			email,
			password: passwordHashed,
		});

		const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: "7d" });

		res.cookie("token", token, {
			httpOnly: true,
			secure: process.env.NODE_ENV !== "development",
			sameSite: process.env.NODE_ENV !== "development" ? 'none' : "strict",
			maxAge: 7 * 24 * 60 * 60 * 1000,
		}).json({ message: "Signed up successfully" });
	} catch (error) {
		next(error);
	}
};


export const login = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			throw createHttpError(400, "All fields required");
		}

		const user = await UserModel.findOne({email}).select("+password");

		if(!user) {
			throw createHttpError(401, "Invalid email or password");
		}

		const passwordMatch = await bcrypt.compare(password, user.password)


		if (!passwordMatch) {
			throw createHttpError(401, "Invalid email or password");
		}

		const token = jwt.sign({id: user._id}, process.env.SECRET_KEY, {expiresIn: "7d"});
		res.cookie("token", token, {
			httpOnly:true,
			secure:  process.env.NODE_ENV !== "development",
			sameSite: process.env.NODE_ENV !== "development" ? 'none' : "strict",
			maxAge: 7 * 24 * 60 * 60 * 1000,
		});
		res.status(200).json({message: "login success"});
	}catch (error) {
		next(error);
	}
}

export const logout = async (req, res, next) => {
	try {
		res.clearCookie('token', {
			httpOnly: true,
			secure:  process.env.NODE_ENV !== "development",
			sameSite: process.env.NODE_ENV !== "development" ? 'none' : "strict",
		})
		res.status(200).json({message: "logout success"});

	} catch (error) {
		next(error);
	}
}
