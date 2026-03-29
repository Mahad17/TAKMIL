import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BlogPost } from './entities/blog.entity';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(BlogPost)
    private readonly blogRepository: Repository<BlogPost>,
  ) {}

  async findAll(page: number = 1, limit: number = 10, search?: string) {
    const query = this.blogRepository.createQueryBuilder('post');

    if (search) {
      query.where('post.title LIKE :search OR post.content LIKE :search', {
        search: `%${search}%`,
      });
    }

    const [items, total] = await query
      .orderBy('post.createdAt', 'DESC')
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return {
      items,
      total,
      page,
      lastPage: Math.ceil(total / limit),
    };
  }

  async findOne(id: number): Promise<BlogPost> {
    const post = await this.blogRepository.findOne({ where: { id } });
    if (!post) throw new NotFoundException(`Post with ID ${id} not found`);
    return post;
  }

  async create(createPostDto: CreatePostDto): Promise<BlogPost> {
    const newPost = this.blogRepository.create(createPostDto);
    return await this.blogRepository.save(newPost);
  }

  async update(id: number, updatePostDto: Partial<CreatePostDto>): Promise<BlogPost> {
    const post = await this.findOne(id);
    Object.assign(post, updatePostDto);
    return await this.blogRepository.save(post);
  }

  async remove(id: number): Promise<void> {
    const result = await this.blogRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException(`Post with ID ${id} not found`);
  }
}