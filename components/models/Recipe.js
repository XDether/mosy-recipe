export default class Recipe
{
    constructor(id, categoryID, title, ingredients, instructions, description, portions,time)
    {
        this.id = id
        this.categoryID = categoryID;
        this.title = title;
        this.ingredients = ingredients;
        this.instructions = instructions;
        this.description = description;
        this.portions = portions;
        this.time = time;

    }
}