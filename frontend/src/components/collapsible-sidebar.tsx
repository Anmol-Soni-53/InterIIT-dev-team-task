import {  useState } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ChevronRight, Menu } from "lucide-react"
import Component from "./nested-tree-accordion"
import Details from "./item-details"
import React from "react"

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

const OptimisedComponent = React.memo(Component);
const SidebarContent = React.memo(({ treeData }: { treeData: TreeNode[] }) => (
    <ScrollArea className="h-full py-6 pl-6 pr-6">
        <OptimisedComponent data={treeData} />
    </ScrollArea>
));

export default function CollapsibleSidebar({ treeData }: any) {
    const [isExpanded, setIsExpanded] = useState(false)
    const toggleSidebar = () => {
        console.log(treeData);
        setIsExpanded(!isExpanded)
    }
    return (
        <div className="flex h-screen">
            <aside className={` hidden md:flex flex-col border-r transition-all duration-300 ${isExpanded ? "min-w-fit" : "w-5 border-none" }`}>
                <div className="flex items-center justify-between p-4 pl-1">
                    <h1 className={`text-xl font-bold ${isExpanded ? "block" : "hidden"}`}>Godown Tracker</h1>
                    <Button variant="ghost" size="icon" onClick={toggleSidebar}>
                        <ChevronRight className={`h-4 ml-1 w-4 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                    </Button>
                </div>
                {isExpanded && <SidebarContent treeData={treeData} />}
            </aside>

            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="md:hidden absolute left-0 top-4">
                        <Menu className="h-4 w-4" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="min-w-fit">
                    <SidebarContent treeData={treeData} />
                </SheetContent>
            </Sheet>

            <main className="flex-1 p-5 ml-8 md:ml-3">
                <Details />
            </main>
        </div>
    )
}