import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl } from 'class-validator';

export class CreateVideoDto {
  @ApiProperty({ required: false })
  @IsString()
  name: string;

  @ApiProperty()
  @IsUrl()
  url: string;
}
