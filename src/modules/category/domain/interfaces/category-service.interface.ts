import { CreateCategoryDto } from "../../dto/request/create-category.dto"
import { UpdateCategoryDto } from "../../dto/request/update-category.dto"
import { ResponseCategory } from "../../dto/response/response-category.dto"

export interface CategoryServiceInterface {
    create(createCategoryDto: CreateCategoryDto): Promise<ResponseCategory>
    findAll(): Promise<ResponseCategory[]>
    findOne(id: number): Promise<ResponseCategory>
    update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<ResponseCategory>
    remove(id: number): Promise<void>
}