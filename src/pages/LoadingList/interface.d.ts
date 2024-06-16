export interface ListLoading {
  key: string,
  avatar?: any,
  name: string,
  desc: string,
  content: any,
  show: boolean 
}

interface DataType {
  gender?: string;
  name: {
    title?: string;
    first?: string;
    last?: string;
  };
  email?: string;
  picture: {
    large?: string;
    medium?: string;
    thumbnail?: string;
  };
  nat?: string;
  loading: boolean;
}