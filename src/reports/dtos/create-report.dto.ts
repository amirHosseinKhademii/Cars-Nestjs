import {
  IsString,
  IsNumber,
  Min,
  Max,
  IsLongitude,
  IsLatitude,
} from 'class-validator';

export class CreateReportDto {
  @IsNumber()
  @Min(0)
  @Max(1000000)
  price: number;
  @IsString()
  make: string;
  @IsString()
  model: string;
  @IsNumber()
  @Min(1930)
  @Max(2022)
  year: number;
  @IsNumber()
  @IsLongitude()
  lng: number;
  @IsNumber()
  @IsLatitude()
  lat: number;
  @IsNumber()
  @Max(100000)
  mileage: number;
}
