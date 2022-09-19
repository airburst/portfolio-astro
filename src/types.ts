export type Gallery = {
  name: string;
  folder: string;
  cover: string;
};

export type Breadcrumb = {
  name: string;
  url: string;
};

export type Photo = {
  name: string;
  width: number;
  height: number;
  dateTaken?: string | undefined | null;
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
