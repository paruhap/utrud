"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ContentService = class ContentService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createContentDto) {
        try {
            return await this.prisma.content.create({
                data: createContentDto,
            });
        }
        catch (error) {
            throw error;
        }
    }
    async findAll() {
        return await this.prisma.content.findMany();
    }
    async findOne(id) {
        const content = await this.prisma.content.findUnique({
            where: { id },
        });
        if (!content) {
            throw new common_1.NotFoundException(`Content with ID ${id} not found`);
        }
        return content;
    }
    async update(id, updateContentDto) {
        await this.findOne(id);
        try {
            return await this.prisma.content.update({
                where: { id },
                data: updateContentDto,
            });
        }
        catch (error) {
            throw error;
        }
    }
    async remove(id) {
        await this.findOne(id);
        try {
            return await this.prisma.content.delete({
                where: { id },
            });
        }
        catch (error) {
            throw error;
        }
    }
};
exports.ContentService = ContentService;
exports.ContentService = ContentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ContentService);
//# sourceMappingURL=content.service.js.map