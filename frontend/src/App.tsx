// import Component from "./components/nested-tree-accordion"
import { useEffect, useState } from "react";
import CollapsibleSidebar from "./components/collapsible-sidebar"
interface Item {
  id: string
  name: string
  item_id: string
}
interface TreeNode {
  id: string
  name: string
  godown_id: string
  children?: TreeNode[]
  Item?: Item[]
}
function App() {
  const [treeData, setTreeData] = useState<TreeNode[]>([])
  const fetchData =async()=>{
    fetch('http://localhost:3000/root')
    .then(response => response.json()) 
    .then(data => {
        console.log(data);
        setTreeData(data);
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
  }
  useEffect(() => {
    fetchData();
  }, [])
  return (
    <CollapsibleSidebar treeData={treeData}/>
  )
}

export default App


