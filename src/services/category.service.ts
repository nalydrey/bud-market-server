import { In, IsNull, Not } from "typeorm";
import { myDataSource } from "../data-source/data-source.init.js";
import { CreateCategoryDto } from "../dto/category/create-category.dto.js";
import { EditCategoryDto } from "../dto/edit-category.dto.js";
import { Category } from "../entity/category.entity.js";
import getSlug from 'speakingurl'
import { Photo } from "../entity/photo.entity.js";
import { CategoryQueryDto } from "../dto/category/category-query.dto.js";

interface CreateCategoryData extends CreateCategoryDto {
    photo?: Photo | null
}

const repo = myDataSource.getRepository(Category)
const treeRepo = myDataSource.manager.getTreeRepository(Category)

export class CategoryService {

    async create(createData: CreateCategoryData) {
        const {name, parentId, photo} = createData
        const category = new Category()
        category.name
        if(photo) category.photo = photo
        if(parentId){
            const parent = await repo.findOneBy({id: parentId})
            if(parent) category.parent = parent
        }
        const translit = getSlug(name, {separator: '_'})
        category.name = name
        category.systemName = translit
        return repo.save(category)
    }

    delete(category: Category) {
        return repo.remove(category)
    }

    async update(editCategoryDto: EditCategoryDto) {
        const { id, name, parentId } = editCategoryDto
        const category = await repo.findOneBy({id})
        if(category){
            if(name) category.name = name
            if(parentId){
              const parent = await repo.findOneBy({id: parentId})  
              if(parent) category.parent = parent
            }
            return repo.save(category)
        }
    }

    getOne(id: number) {
        return repo.findOneBy({id})
    }

    getTree() {
        return treeRepo.findTrees({relations: ['photo']})
    }

    async getDescendantsTree(systemName: string) {
        const category = await repo.findOneBy({systemName})
        return category ? treeRepo.findDescendantsTree(category, {relations: ['photo']}) : null
    }

    async getAncestors (systemName: string) {
        const category = await repo.findOneBy({systemName})
        return category ? treeRepo.findAncestors(category) : null
    }

    getMany(query: CategoryQueryDto) {
        console.log(query);
        
       return repo.find({
            where: {
                products: query.filter && query.filter.productIds ? {id: In(query.filter.productIds)} : {id: Not(IsNull())},
                // systemName: query.filter?.systemName,
            },
        })
    }
    


}

export const categoryService = new CategoryService() 