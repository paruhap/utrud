import { PrismaService } from '../prisma/prisma.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
export declare class ServicesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createServiceDto: CreateServiceDto): import(".prisma/client").Prisma.Prisma__ServicesClient<{
        id: number;
        category: string;
        title: string;
        text: string | null;
        price: string;
        link: string | null;
        subcategory: string | null;
        subtitle: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        category: string;
        title: string;
        text: string | null;
        price: string;
        link: string | null;
        subcategory: string | null;
        subtitle: string | null;
    }[]>;
    findOne(id: number): string;
    update(id: number, updateServiceDto: UpdateServiceDto): import(".prisma/client").Prisma.Prisma__ServicesClient<{
        id: number;
        category: string;
        title: string;
        text: string | null;
        price: string;
        link: string | null;
        subcategory: string | null;
        subtitle: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    remove(id: number): import(".prisma/client").Prisma.Prisma__ServicesClient<{
        id: number;
        category: string;
        title: string;
        text: string | null;
        price: string;
        link: string | null;
        subcategory: string | null;
        subtitle: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
