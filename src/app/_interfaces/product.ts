export interface ProductInterface {
  reference: string;
  image: string;
  name: string;
  pieces: number;
  description: string;
  ingredients: string[];
  nutritionPdf: string;
  allergenes: string[];
  categorieId: number;
  collectionId: number;
  url: string;
  prixLot: number;
  prixUnitaire: number;
}
