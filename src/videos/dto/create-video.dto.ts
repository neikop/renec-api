import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateVideoDto {
  @ApiProperty()
  @IsUrl()
  url: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  title: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  authorName: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  authorUrl: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  thumbnailUrl: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  html: string;
}
