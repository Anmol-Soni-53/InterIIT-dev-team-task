import React, { useEffect, useState } from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ChevronRight, ChevronDown, Folder, File } from 'lucide-react'
import useStore from '@/store'


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

interface TreeAccordionProps {
  data: TreeNode[]
}

const TreeAccordion: React.FC<TreeAccordionProps> = ({ data }) => {
  const setItemId = useStore((state) => state.setItemId);
  const [expanded, setExpanded] = useState<string[]>([])
  const [recieved, setRecieved] = useState<string[]>([]);
  const [treeData, setTreeData] = useState<TreeNode[]>(data)

  useEffect(() => {
    setTreeData(data);
  }, [data]);

  const toggleExpand = (id: string) => {
    setExpanded(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    )
  }
  function updateTreeById(id: string, updatedData: TreeNode, treeData: TreeNode[]): TreeNode[] {
    return treeData.map(node => {
      if (node.id === id) {
        return { ...node, ...updatedData };
      }
      if (node.children) {
        return {
          ...node,
          children: updateTreeById(id, updatedData, node.children),
        };
      }
      return node; 
    });
  }
  function handleMain(item_id:string){
      setItemId(item_id)
  }
  const renderTree = (nodes: TreeNode[]) => {
    const handleAccordion = async (id: string, godown_id: string) => {
      if (!recieved.includes(id)) {
        try {
          // setLoading(true);
          const response = await fetch(`http://localhost:3000/${godown_id}`);
          const fetchedData = await response.json();
          console.log(fetchedData);
          const updatedTree = updateTreeById(id, { ...fetchedData }, treeData);
          setTreeData(updatedTree);
          setRecieved(prev => [...prev, id]);
        } catch (error) {
          console.error('There was a problem with the fetch operation:', error);
        }
      }
    };

    return nodes.map(node => (
      <AccordionItem value={node.id} key={node.id} className=" border-none w-full">
        <AccordionTrigger onClick={() => {
          handleAccordion(node.id, node.godown_id);
          toggleExpand(node.id);
          // console.log(node)
        }} className={`hover:no-underline ${expanded.includes(node.id) ? 'font-semibold' : ''}`}>
          <div className=" flex items-center gap-2">
            <>
              {expanded.includes(node.id) ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
              <Folder className="h-4 w-4" />
            </>
            {node.name}
          </div>
        </AccordionTrigger>
        {node.children && (
          <AccordionContent>
            <div className="ml-4 border-l border-l-emerald-500 pl-4">
              <Accordion type="multiple" value={expanded} onValueChange={setExpanded}>
                {(node.children.length===0 && node.Item?.length===0)  ? ( <div>Empty</div>):(renderTree(node.children))}
                {/* {renderTree(node.children)} */}
              </Accordion>
            </div>
          </AccordionContent>
        )}
        {node.Item?.length !== 0 && (
          <AccordionContent>
            <div className="ml-4 border-l border-green-900 pl-4">
              <Accordion type="multiple" value={expanded} onValueChange={setExpanded}>
                {node.Item?.map((item, index) => (
                  <AccordionItem key={item.id} value={`item-${index}`}>
                    <AccordionTrigger><File className="h-4 w-4 ml-4" /><div className='bg-red-600' onClick={()=>{
                      console.log(item.item_id)
                      handleMain(item.item_id)

                    }} >{item.name}</div></AccordionTrigger>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </AccordionContent>
        )}

      </AccordionItem>
    ))
  }

  return (
    <Accordion type="multiple" value={expanded} onValueChange={setExpanded} className="w-full ">
      {renderTree(treeData)}
    </Accordion>
  )
}

export default function Component({ data }: any) {
  return <TreeAccordion data={data} />
}