import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post(':id')
  @UseGuards(JwtAuthGuard)
  create(
    @Body() createCommentDto: CreateCommentDto,
    @Req() req,
    @Param('id') id: string,
  ) {
    return this.commentsService.create(createCommentDto, +req.user.id, +id);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findByTask(@Param('id') id: string) {
    return this.commentsService.findByTask(+id);
  }
}
