import { myDataSource } from "../data-source/data-source.init.js";
import { CreateCategoryDto } from "../dto/create-category.dto.js";
import { EditCategoryDto } from "../dto/edit-category.dto.js";
import { Category } from "../entity/category.entity.js";
import getSlug from 'speakingurl'

const repo = myDataSource.getRepository(Category)
const treeRepo = await myDataSource.manager.getTreeRepository(Category)

export class CategoryService {
    async create(categoryDto: CreateCategoryDto) {
        const {name, parentId} = categoryDto
        const category = new Category()
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

    getOne() {

    }

    getMany() {
        return treeRepo.findTrees()
        return repo.find()
    }
}

export const categoryService = new CategoryService() 