import { ReactNode } from "react";

type Id = string;

type Model = {
  id: Id;
  createdAt?: Date;
  updatedAt?: Date;
  deleted?: boolean;
};

type ControllerRender = {
  field: ControllerRenderProps<FieldValues, string>;
  fieldState: ControllerFieldState;
};

type PalleteType = {
  name: string;
  lighter: string;
  light: string;
  main: string;
  dark: string;
  darker: string;
  contrastText: string;
};

type NavItem = {
  title: string;
  path: string;
  icon: string;
  info: ReactNode;
  children: { title: string; path: string }[];
};

type NavGroupType = {
  subheader?: string;
  items: NavItem[];
};

type File = Model & {
  title: string;
  url: string;
  mimeType: string;
  size: number;
  previewPath: string;
  usedPlaces: UsedPlace[];
};

type Category = Model & {
  parentId: Id;
  title: string;
  description: string;
  avatar: File;
  active: boolean;
};

type Product = Model & {
  userId: Id;
  shopId: Id;
  name: string;
  description: string;
  images: File[];
  price: number;
  priceSale: number;
  inStock: boolean;
  category: Category;
  active: boolean;
};

type Shop = Model & {
  userId: Id;
  title: string;
  shopStringId: string;
  phoneNumber?: string;
  about?: string;
  address?: string;
  country?: string;
  state?: string;
  city?: string;
  phone?: string;
  logo?: File;
  cover?: File;
  facebookLink?: string;
  instagramLink?: string;
  twitterLink?: string;
  active: boolean;
  products: Product[];
};
