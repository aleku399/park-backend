import { Response, Request } from "express";
import {
  User, 
  findUserById,
  createUser,
  updateUser,
  deleteUser,
  listUsers,
  updateUserPassword,
} from "../entity/User";
import {
  customPayloadResponse,
  hashPassword,
  getAuthAccessToken,
} from "../utils/auth";
import { validateFields } from "../utils";

export const handleCreateUser = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const validationError = validateFields({ firstName, lastName, email, password });
    if (validationError) {
      return res.status(200).json(customPayloadResponse(false, validationError)).end();
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(200).json(customPayloadResponse(false, "User Already Exists")).end();
    }

    const hashedPassword = await hashPassword(password, 10);
    if (!hashedPassword) {
      return res.status(200).json(customPayloadResponse(false, "An Error Occurred")).end();
    }

    const newUser = await createUser(firstName, lastName, email, hashedPassword);
    const accessToken = getAuthAccessToken(newUser, process.env.ACCESS_TOKEN_SECRET);

    return res.status(200).json(customPayloadResponse(true, { token: accessToken, User: newUser })).end();
  } catch (error) {
    console.error(error);
    return res.status(200).json(customPayloadResponse(false, "An Error Occurred")).end();
  }
};

export const handleGetUsers = async (req: Request, res: Response) => {
  try {
    const users = await listUsers();
    return res.status(200).json(customPayloadResponse(true, users)).end();
  } catch (error) {
    console.error(error);
    return res.status(200).json(customPayloadResponse(false, "An Error Occurred")).end();
  }
};

export const handleGetUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(200).json(customPayloadResponse(false, "Id Required")).end();
    }

    const user = await findUserById(parseInt(id));
    if (!user) {
      return res.status(200).json(customPayloadResponse(false, "User Not Found")).end();
    }

    return res.status(200).json(customPayloadResponse(true, user)).end();
  } catch (error) {
    console.error(error);
    return res.status(200).json(customPayloadResponse(false, "An Error Occurred")).end();
  }
};

export const handleUpdateUser = async (req: Request, res: Response) => {
  try {
    const { id, firstName, lastName, email, phone, department } = req.body;

    const validationError = validateFields({ id, firstName, lastName, email, phone, department });
    if (validationError) {
      return res.status(200).json(customPayloadResponse(false, validationError)).end();
    }

    const user = await findUserById(id);
    if (!user) {
      return res.status(200).json(customPayloadResponse(false, "User Not Found")).end();
    }

    const updatedUser = await updateUser(id, firstName, lastName, email);
    return res.status(200).json(customPayloadResponse(true, updatedUser)).end();
  } catch (error) {
    console.error(error);
    return res.status(200).json(customPayloadResponse(false, "An Error Occurred")).end();
  }
};

export const handleUpdateUserPassword = async (req: Request, res: Response) => {
  try {
    const { id, password } = req.body;

    const validationError = validateFields({ id, password });
    if (validationError) {
      return res.status(200).json(customPayloadResponse(false, validationError)).end();
    }

    const user = await findUserById(id);
    if (!user) {
      return res.status(200).json(customPayloadResponse(false, "User Not Found")).end();
    }

    const hashedPassword = await hashPassword(password, 10);
    if (!hashedPassword) {
      return res.status(200).json(customPayloadResponse(false, "An Error Occurred")).end();
    }

    const updatedUser = await updateUserPassword(id, hashedPassword);
    return res.status(200).json(customPayloadResponse(true, updatedUser)).end();
  } catch (error) {
    console.error(error);
    return res.status(200).json(customPayloadResponse(false, "An Error Occurred")).end();
  }
};

export const handleDeleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(200).json(customPayloadResponse(false, "Id Required")).end();
    }

    await deleteUser(parseInt(id));
    return res.status(200).json(customPayloadResponse(true, "User Deleted")).end();
  } catch (error) {
    console.error(error);
    return res.status(200).json(customPayloadResponse(false, "An Error Occurred")).end();
  }
};
