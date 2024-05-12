import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { SolutionsService } from './solutions.service';
import { CreateSolutionDto } from './dto/create-solution.dto';
import { UpdateSolutionDto } from './dto/update-solution.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('solutions')
export class SolutionsController {
  constructor(private readonly solutionsService: SolutionsService) {}
  @Get('user')
  @UseGuards(JwtAuthGuard)
  findAllByUser(@Req() req) {
    return this.solutionsService.findAllByUser(+req.user.id);
  }

  @Post(':id')
  @UseGuards(JwtAuthGuard)
  create(
    @Body() createSolutionDto: CreateSolutionDto,
    @Req() req,
    @Param('id') id: string,
  ) {
    return this.solutionsService.create(createSolutionDto, +req.user.id, +id);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOneByTask(@Req() req, @Param('id') id: string) {
    return this.solutionsService.findOneByTask(+req.user.id, +id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Body() updateSolutionDto: UpdateSolutionDto,
    @Req() req,
    @Param('id') id: string,
  ) {
    return this.solutionsService.update(updateSolutionDto, +req.user.id, +id);
  }
}
