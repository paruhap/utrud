import { ContentService } from './content.service';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
export declare class ContentController {
    private readonly contentService;
    constructor(contentService: ContentService);
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
    findOne(id: string): Promise<{
        id: number;
        title: string;
        text: string | null;
        link: string | null;
        subtitle: string | null;
        block: string | null;
        subtext: string | null;
        link2: string | null;
    }>;
    update(id: string, updateContentDto: UpdateContentDto): Promise<{
        id: number;
        title: string;
        text: string | null;
        link: string | null;
        subtitle: string | null;
        block: string | null;
        subtext: string | null;
        link2: string | null;
    }>;
    remove(id: string): Promise<{
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
