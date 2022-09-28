import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create-report.dto';
import { Report } from './report.entity';
import { ApproveReportDto } from './dtos/approve-report.dto';
import { GetEstimateDto } from './dtos/get-estimate.dto';

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}

  get({ make, model }: Partial<GetEstimateDto>) {
    return this.repo
      .createQueryBuilder()
      .select('*')
      .where('make = :make', { make })
      .where('model = :model', { model })
      .getRawMany();
  }
  create(body: CreateReportDto, user: User) {
    const report = this.repo.create(body);
    report.user = user;
    return this.repo.save(report);
  }

  async approve(id: number, { approved }: ApproveReportDto) {
    const report = await this.repo.findOneBy({ id });
    if (!report) throw new NotFoundException('No report by this id.');
    report.approved = approved;
    return this.repo.save(report);
  }
}
