import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { User } from '../users/user.entity';
import { AuthGuard } from '../guards/auth.guard';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
import { Serializer } from '../interceptors/serialize.interceptor';
import { ReportDto } from './dtos/report.dto';

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}
  @Get()
  getReports() {
    return this.reportsService.getReports();
  }
  @Post()
  @UseGuards(AuthGuard)
  @Serializer(ReportDto)
  createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
    return this.reportsService.create(body, user);
  }
}
