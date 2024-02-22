import { ArrayContains, IsNull, Not } from "typeorm";
import { myDataSource } from "../data-source/data-source.init.js";
import { CreateCategoryDto } from "../dto/create-category.dto.js";
import { EditCategoryDto } from "../dto/edit-category.dto.js";
import { Category } from "../entity/category.entity.js";
import getSlug from 'speakingurl'
import { PhotoService } from "./photo.service.js";
import { Photo } from "../entity/photo.entity.js";
import { CategoryQueryDto } from "../dto/category/category-query.dto.js";

const repo = myDataSource.getRepository(Category)
const treeRepo = await myDataSource.manager.getTreeRepository(Category)

export class CategoryService {

    async create(categoryDto: CreateCategoryDto, photo: Photo ) {
        const {name, parentId} = categoryDto
        const category = new Category()
        category.photo = photo
        if(parentId){
            const parent = await repo.findOneBy({id: parentId})
            if(parent) category.parent = parent
        }
        const translit = getSlug(name, {separator: '_'})
        category.name = name
        category.systemName = translit
        return repo.save(category)
    }

    delete(id: number) {
        return repo.delete(id)
    }

    async update(editCategoryDto: EditCategoryDto) {
        const { id, name, parentId } = editCategoryDto
        const category = await repo.findOneBy({id})
        console.log(category);
        
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
       return repo.find({
            where: {
                products: {id: Not(IsNull())},
                // systemName: query.filter?.systemName,
            },
        })
    }
    


}

export const categoryService = new CategoryService() 