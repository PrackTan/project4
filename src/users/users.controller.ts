  import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
  import { UsersService } from './users.service';
  import { CreateUserDto } from './dto/create-user.dto';
  import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
  @ApiTags("user")
  @Controller('users')
  export class UsersController {
    constructor(private readonly usersService: UsersService) {}
    
    @ApiBody({type:CreateUserDto})
    @ApiBearerAuth()
    @UseGuards(AuthGuard("jwt"))
    @Post()
    create(@Body() createUserDto: CreateUserDto) {
      return this.usersService.create(createUserDto);
    }

    @Get()
    findAll() {
      return this.usersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.usersService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
      return this.usersService.update(+id, updateUserDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.usersService.remove(+id);
    }
  }
