import * as bcrypt from "bcryptjs";

class UserService {
  async hashPassword (password: any) {
    const salt = await bcrypt.genSalt(10);
    const encryptPassword = await bcrypt.hash(password, salt);

    return encryptPassword;
  }

  async comparePassword (password: any, userData: any) {
    const validPassword = await bcrypt.compare(password, userData.password);
    if (!validPassword) return validPassword;
    return validPassword;
  }
}

export default UserService;
