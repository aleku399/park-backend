import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm"

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    firstName!: string;
  
    @Column()
    lastName!: string;
  
    @Column()
    password!: string;
  
    @Column()
    email!: string;

}

export const createUser = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ) => {
    const user = new User();
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.password = password;

    await user.save();
    return user;
  };

  export const findUserById = async (id: number) => {
    return User.findOne({
      where: { id },
    });
  };
  
  export const listUsers = async () => {
    return User.find();
  };

  export const updateUser = async (
    id: number,
    firstName: string,
    lastName: string,
    email: string,
  ) => {
    const user = await User.findOne({ where: { id } });
    if (!user) return null;
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;

    await user.save();
    return user;
  };
  
  export const updateUserPassword = async (id: number, password: string) => {
    const user = await User.findOne({ where: { id } });
    if (!user) throw new Error("User not found");
    user.password = password;
    await user.save();
    return user;
  };
  
  export const deleteUser = async (id: number) => {
    const user = await User.findOne({ where: { id } });
    if (!user) throw new Error("Employee not found");
    await user.remove();
    return true;
  };
  