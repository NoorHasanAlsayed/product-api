import { UsersService } from './../users/users.service';
import { BadRequestException, Body, ClassSerializerInterceptor, Controller, Get, NotFoundException, Post, Req, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { RigesterDto } from './dto/rigester.dto';
import { JwtService } from '@nestjs/jwt';
import { Response , Request} from 'express';
import { AuthGuard } from './auth.guard';
@Controller()
export class AuthController {

constructor(
    private userService:UsersService,
    private jwtService:JwtService

){}
@Post('register')
async register(@Body() body: RigesterDto){
    if(body.password != body.password_confirm){
        throw new BadRequestException('Passwords Do Not match')
    }
    const { password, ...document } = body;
    const hased= await bcrypt.hash(body.password,12);
    const user={...document,password:hased}
    return this.userService.create(user);    
}
@Post('login')
async login(
    @Body('email') email: string,
    @Body('password') password: string,
    @Res({passthrough: true}) response: Response
) {
    const user = await this.userService.findOneByEmail(email);

    if (!user) {
        throw new NotFoundException('User not found');
    }

    if (!await bcrypt.compare(password, user.password)) {
        throw new BadRequestException('Invalid credentials');
    }

    const jwt = await this.jwtService.signAsync({id: user._id});

    response.cookie('jwt', jwt, {httpOnly: true});
   

    return {email:user.email,
            firstName:user.first_name,
            lastName:user.last_name};
}
@UseGuards(AuthGuard)
@Get('user')
async user(@Req() request:Request){
    const cookie = request.cookies['jwt'];
    const data= await this.jwtService.verifyAsync(cookie);
    const user =await (await this.userService.findOne(data['id']));
    return user;
}
@UseGuards(AuthGuard)
@Post('logout')
async logout(@Res({passthrough: true}) response: Response) {
    response.clearCookie('jwt');

    return {
        message: 'Success'
    }
}

}
