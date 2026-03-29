/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query, UseGuards } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreatePostDto } from './dto/create-post.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('posts')

export class BlogController {
  constructor(private readonly blogService: BlogService) {}

 @Get()
getAll(
  @Query('page') page: number = 1,
  @Query('limit') limit: number = 10,
  @Query('search') search?: string,
) {
  return this.blogService.findAll(page, limit, search);
}

  @Get(':id')
  // @UseGuards(JwtAuthGuard) 
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.blogService.findOne(id);
  }

  @Post()
  // @UseGuards(JwtAuthGuard) 
  create(@Body() createPostDto: CreatePostDto) {
    return this.blogService.create(createPostDto);
  }

  @Patch(':id')
  // @UseGuards(JwtAuthGuard) 
  update(@Param('id', ParseIntPipe) id: number, @Body() updatePostDto: Partial<CreatePostDto>) {
    return this.blogService.update(id, updatePostDto);
  }

  @Delete(':id')
  // @UseGuards(JwtAuthGuard) 
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.blogService.remove(id);
  }
}