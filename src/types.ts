export type Gallery = {
  folder: string;
  cover: string;
  caption?: string | null;
};

export type Breadcrumb = {
  name: string;
  url: string;
};

type SrcSet = {
  src: string;
  width: number;
  height: number;
};

export type Slide = {
  src: string;
  width: number;
  height: number;
  srcSet: SrcSet[];
};
