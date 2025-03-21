import { Controller, Get, Param, ParseIntPipe, Patch, Delete, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsersService } from './users.service';

@Controller('users')

export class UsersController {
    constructor(private readonly usersService: UsersService) {}
    
    @Get()
    findAll(): any {
        return this.usersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.findOne(id);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard) 
    update(@Param('id', ParseIntPipe) id: number, @Body() data: any) {
        return this.usersService.update(id, data);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.remove(id);
    }
}
