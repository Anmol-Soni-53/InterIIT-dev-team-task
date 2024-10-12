import CollapsibleSidebar from "./components/collapsible-sidebar"
import usedataStore from "./dataStore";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import ItemType from "./components/item-type";
import { data } from "./rootData";
import AuthComponent from "./components/Auth";

function App() {
  // const treeData = usedataStore((state) => state.treeData);
  const setTreeData = usedataStore((state) => state.setTreeData);
  setTreeData(data);
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


