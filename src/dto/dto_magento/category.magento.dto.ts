export class CategoryDtoMagento {
  id: Number;
  name: string;
  is_active: Boolean;
  children_data: Array<CategoryDtoMagento> = [];
}
