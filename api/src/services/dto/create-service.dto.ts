import { IsString, IsOptional } from 'class-validator';

export class CreateServiceDto {
    @IsString()
    category: string;

    @IsString()
    title: string;

    @IsString()
    @IsOptional()
    text?: string;

    @IsString()
    price: string;

    @IsString()
    @IsOptional()
    link?: string;
}
