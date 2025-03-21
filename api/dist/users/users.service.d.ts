import { PrismaService } from '../prisma/prisma.service';
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        email: string;
        password: string;
        name: string | null;
        phone: string | null;
        phone2: string | null;
        address: string | null;
        telegram: string | null;
    }[]>;
    findOne(id: number): import(".prisma/client").Prisma.Prisma__UserClient<{
        id: number;
        email: string;
        password: string;
        name: string | null;
        phone: string | null;
        phone2: string | null;
        address: string | null;
        telegram: string | null;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    create(data: any): import(".prisma/client").Prisma.Prisma__UserClient<{
        id: number;
        email: string;
        password: string;
        name: string | null;
        phone: string | null;
        phone2: string | null;
        address: string | null;
        telegram: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    update(id: number, data: any): import(".prisma/client").Prisma.Prisma__UserClient<{
        id: number;
        email: string;
        password: string;
        name: string | null;
        phone: string | null;
        phone2: string | null;
        address: string | null;
        telegram: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    remove(id: number): import(".prisma/client").Prisma.Prisma__UserClient<{
        id: number;
        email: string;
        password: string;
        name: string | null;
        phone: string | null;
        phone2: string | null;
        address: string | null;
        telegram: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
