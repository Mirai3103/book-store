export interface IBookPreview {
    id: number;
    alias: string;
    name: string;
    title: string;
    bookImages: string;
    episode?: string;
    discount: number;
    price: number;
    author: string;
}
export interface IBook extends IBookPreview {
    description: string;
    bookCoverType: string;
    translatorName: string;
    publishYear: string;
    language: string;
    weight: number;
    size: string;
    numberOfPages: number;
    ageGroup: string;
    level: string;
    grade: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    providerId: number;
    publisherId: number;
    seriesId: number;
    categoryId: number;
    provider: IProvider;
    publisher: IProvider;
    category: ICategory;
}

export interface IProvider {
    id: number;
    name: string;
}
export interface IPublisher {
    id: number;
    name: string;
    description: string;
}
export interface ICategory {
    id: number;
    name: string;
    parent: ICategory;
}
