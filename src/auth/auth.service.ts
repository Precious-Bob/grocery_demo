import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/schemas/user.schema';
import { signupDto, signinDto } from 'src/dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signup({ password, email, name }: signupDto) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = new this.userModel({
      email: email,
      password: hashedPassword,
      name: name,
    });
    await createdUser.save();
    return this.generateToken(createdUser);
  }

  async signin({ email, password }: signinDto) {
    const user = await this.userModel.findOne({ email });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      throw new UnauthorizedException('Invalid credentials');

    return this.generateToken(user);
  }

  private generateToken(user: User): { access_token: string } {
    const payload = { email: user.email, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
