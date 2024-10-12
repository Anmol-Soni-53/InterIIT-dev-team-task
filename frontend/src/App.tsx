import CollapsibleSidebar from "./components/collapsible-sidebar"
import usedataStore from "./dataStore";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import ItemType from "./components/item-type";
import { data } from "./rootData";
import AuthComponent from "./components/Auth";

// const item = {
//   item_id: "1026d447463a4f23826598d82db146bc",
//   name: "Drill by Black & Decker",
//   quantity: 275,
//   category: "Tools",
//   price: 460.14,
//   status: "in_stock",
//   parentGodownId: "4ce59062eadd4d4ca5e105f30a9f7256",
//   brand: "Black & Decker",
//   attributes: {
//     type: "Hand Tool",
//     material: "Plastic",
//     warranty_years: 1
//   },
//   image_url: "https://atozshop.co.in/wp-content/uploads/2023/08/71ZCAu0w41L._SY550_.jpg"
// }



function App() {
  // const treeData = usedataStore((state) => state.treeData);
  const setTreeData = usedataStore((state) => state.setTreeData);
  setTreeData(data);
  // const [treeData, setTreeData] = useState<TreeNode[]>([])
  // const fetchData = async () => {
  //   fetch('http://localhost:3000/root')
  //     .then(response => response.json())
  //     .then(data => {
  //       console.log(data);
  //       setTreeData(data);
  //     })
  //     .catch(error => {
  //       console.error('There was a problem with the fetch operation:', error);
  //     });
  // }
  // useEffect(() => {
  //   fetchData();
  //   console.log('doing');
  // }, [])
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CollapsibleSidebar />} />
          {/* <Route path="/check" element={<ItemCard item={item} />} /> */}
          <Route path="/user/:type" element={<AuthComponent/>} />
          <Route path="/filter/:type" element={<ItemType/>} />
        </Routes>
      </BrowserRouter>
    </>
  )

}

export default App


