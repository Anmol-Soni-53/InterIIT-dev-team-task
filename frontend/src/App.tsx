// import Component from "./components/nested-tree-accordion"
import { useEffect } from "react";
import CollapsibleSidebar from "./components/collapsible-sidebar"
import usedataStore from "./dataStore";
// interface Item {
//   id: string
//   name: string
//   item_id: string
// }
// interface TreeNode {
//   id: string
//   name: string
//   godown_id: string
//   children?: TreeNode[]
//   Item?: Item[]
// }
function App() {
  // const treeData = usedataStore((state) => state.treeData);
  const setTreeData = usedataStore((state) => state.setTreeData);
  // const [treeData, setTreeData] = useState<TreeNode[]>([])
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
    console.log('doing');
  }, [])
  return (
    <CollapsibleSidebar />
  )
}

export default App


