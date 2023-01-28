export interface IBookPreview {
    id: number;
    alias: string;
    name: string;
    title: string;
    imageCover: string;
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
    images: IImage[];
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
export interface IUser {
    id: number;
    phone: string;
    role: number;
    fullName: string;
    email: string;
    avatar: string;
    address: string;
}
// {
//     "id": 1,
//     "name": "Re:zero - Bắt Đầu Lại Ở Thế Giới Khác",
//     "alias": "re-zero-bat-dau-lai-o-the-gioi-khac",
//     "author": "Tappei Nagatsuki",
//     "lastestBook": {
//       "episode": "Tập 8",
//       "image": "https://cdn0.fahasa.com/media/catalog/product/b/i/bia-1-zero-8.jpg"
//     },
//     "publisher": {
//       "id": 1,
//       "name": "Hồng Đức"
//     },
//     "numberOfFollowers": 37032
//   },

export interface ISeries {
    id: number;
    name: string;
    alias: string;
    author: string;
    lastestBook: {
        episode: string;
        image: string;
    };
    publisher: IPublisher;
    numberOfFollowers: number;
    isFollowed: boolean;
}

export interface IImage {
    id: number;
    url: string;
    bookId: number;
}
export enum PromocodeType {
    Percentage,
    Fixed,
}

export enum ApplyTo {
    Total,
    Shipping,
}
export interface Promocode {
    id: number;
    code: string | null;
    description: string | null;
    name: string | null;
    discount: number | null;
    maxDiscount: number | null;
    minOrderAmount: number | null;
    type: PromocodeType;
    applyTo: ApplyTo;
    stock: number | null;
    applyToCategoryID: number | null;
    applyToCategory: ICategory | null;
    allowMultiple: boolean;
    startDate: string | null;
    endDate: string | null;
    createdAt: string | null;
    deletedAt: string | null;
    // bills: Bill[];
}

//  public record CreateBillRequestModel
//     (
//         uint ShippingAddressId,
//         ICollection<BillDetailRequestModel> BillDetails,
//         int? UserId = null,
//         string? PromoCode = null
//     );
//     public record BillDetailRequestModel
//     (
//         uint BookId,
//         uint Quantity
//     );
export interface ICreateBillRequestModel {
    shippingAddressId: number | null | undefined;
    billDetails: IBillDetailRequestModel[];
    userId?: number;
    promoCode?: string;
    newAddress?: DeliveryAddress;
    isAnonymous?: boolean;
}
export interface IBillDetailRequestModel {
    bookId: number;
    quantity: number;
}

export interface DeliveryAddress {
    id: number;
    userId: number;
    fullName: string;
    phone: string;
    address: string;
    deletedAt: string | null;
    isPrimary: boolean;
}
