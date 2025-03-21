import { PrismaService } from '../prisma/prisma.service';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
export declare class ContentService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createContentDto: CreateContentDto): Promise<{
        id: number;
        title: string;
        text: string | null;
        link: string | null;
        subtitle: string | null;
        block: string | null;
        subtext: string | null;
        link2: string | null;
    }>;
    findAll(): Promise<{
        id: number;
        title: string;
        text: string | null;
        link: string | null;
        subtitle: string | null;
        block: string | null;
        subtext: string | null;
        link2: string | null;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        title: string;
        text: string | null;
        link: string | null;
        subtitle: string | null;
        block: string | null;
        subtext: string | null;
        link2: string | null;
    }>;
    update(id: number, updateContentDto: UpdateContentDto): Promise<{
        id: number;
        title: string;
        text: string | null;
        link: string | null;
        subtitle: string | null;
        block: string | null;
        subtext: string | null;
        link2: string | null;
    }>;
    remove(id: number): Promise<{
        id: number;
        title: string;
        text: string | null;
        link: string | null;
        subtitle: string | null;
        block: string | null;
        subtext: string | null;
        link2: string | null;
    }>;
}
