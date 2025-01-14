// Category
export interface Category {
  id: string;
  name: string;
  description: string;
  contents: Content[];
  courses: Course[];
  requirements: RequirementCompany[];
}
