import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create-report.dto';
import { Report } from './report.entity';

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}
  getReports() {
    return this.repo.find();
  }
  create(body: CreateReportDto) {
    const report = this.repo.create(body);
    return this.repo.save(report);
  }
}
