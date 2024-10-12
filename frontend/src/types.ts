// Types for individual items
export type Item = {
  id: string;
  name: string;
  item_id: string;
};
  
// Types for tree nodes
export type TreeNode = {
  id: string;
  name: string;
  godown_id: string;
  children?: TreeNode[]; 
  Item?: Item[]; 
};
  
export type ItemAttributes ={
  [key: string]: string | number | boolean
};

export type ItemProps ={
  item_id: string
  name: string
  quantity: number
  category: string
  price: number
  status: string
  parentGodownId: string
  brand: string
  attributes: ItemAttributes
  image_url: string
}
