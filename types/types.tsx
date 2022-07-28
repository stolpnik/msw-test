export type Player = {
  id: number;
  name: string;
};

export type Note = {
  id: string;
  title: string;
  description: string;
  author: Player;
};
