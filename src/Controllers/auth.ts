import { Request, Response } from "express";
import { User, createUser } from "../entity/User";
import { customPayloadResponse, hashPassword,  validatePassword,  getAuthAccessToken } from "../utils/auth";
import { validateFields } from "../utils";

export const handleRegisterUser = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const validationError = validateFields({ firstName, lastName, email, password });
    if (validationError) {
      return res.status(400).json(customPayloadResponse(false, validationError));
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json(customPayloadResponse(false, "User Already Exists"));
    }

    const hashedPassword = await hashPassword(password, 10);
    if (!hashedPassword) {
      return res.status(500).json(customPayloadResponse(false, "An Error Occurred"));
    }

    const newUser = await createUser(firstName, lastName, email, hashedPassword);
    if (!newUser) {
      return res.status(500).json(customPayloadResponse(false, "Failed to create user"));
    }

    const accessToken = getAuthAccessToken(newUser, process.env.ACCESS_TOKEN_SECRET);

    return res.status(200).json(customPayloadResponse(true, { token: accessToken, employee: newUser }));
  } catch (error) {
    console.error("Error in handleRegisterUser:", error);
    return res.status(500).json(customPayloadResponse(false, "An Error Occurred"));
  }
};

export const handleUserLogin = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(400).json(customPayloadResponse(false, "User Not found"));
      }
  
      const passwordMatch = await validatePassword(password, user.password);
      if (!passwordMatch) {
        return res.status(400).json(customPayloadResponse(false, "Password is Incorrect!"));
      }
  
      const accessToken = getAuthAccessToken(user, process.env.ACCESS_TOKEN_SECRET);
  
      return res.status(200).json(customPayloadResponse(true, { token: accessToken, user }));
    } catch (error) {
      console.error("Error in handleUserLogin:", error);
      return res.status(500).json(customPayloadResponse(false, "An Error Occurred"));
    }
  };
