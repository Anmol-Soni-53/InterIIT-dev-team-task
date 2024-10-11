import React, { useEffect, useState } from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ChevronRight, ChevronDown, Folder, File } from 'lucide-react'
import useStore from '@/store'
import usedataStore from '@/dataStore'
import { TreeNode } from '@/types'



const TreeAccordion = () => {
  const setItemId = useStore((state) => state.setItemId);
  const treeData = usedataStore((state) => state.treeData);
  const updateNode = usedataStore((state) => state.updateNode);
  const [expanded, setExpanded] = useState<string[]>([])
  const [recieved, setRecieved] = useState<string[]>([]);
  console.log(treeData);

  const toggleExpand = (id: string) => {
    setExpanded(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    )
  }
  function handleMain(item_id:string){
      setItemId(item_id)
  }
  const renderTree = (nodes: TreeNode[]) => {
    const handleAccordion = async (id: string, godown_id: string) => {
      if (!recieved.includes(id)) {
        try {
          const response = await fetch(`http://localhost:3000/${godown_id}`);
          const fetchedData = await response.json();
          console.log(fetchedData);
          updateNode(id, { ...fetchedData });
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
              </Accordion>
            </div>
          </AccordionContent>
        )}
        {node.Item?.length !== 0 && (
          <AccordionContent>
            <div className="ml-4 border-l border-green-900 pl-4">
              <Accordion type="multiple" value={expanded} onValueChange={setExpanded}>
                {node.Item?.map((item, index) => (
                  <AccordionItem key={item.id} value={`item-${index}`} onClick={()=>{
                    console.log(item.item_id)
                    handleMain(item.item_id)
                  }}>
                    <AccordionTrigger><File className="h-4 w-4 ml-4" /><div className=''  >{item.name}</div></AccordionTrigger>
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

export default function Component() {
  
  return <TreeAccordion  />
}