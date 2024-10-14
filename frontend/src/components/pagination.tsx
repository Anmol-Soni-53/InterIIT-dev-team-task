import { useState } from "react";
import MinItemCard from "./min-item-card";
import { ItemProps } from "@/types";
type PaginatedGridProps = {
    items: Partial<ItemProps>[];
    itemsPerPage: number;
};
const PaginatedGrid = ({ items, itemsPerPage=10}:PaginatedGridProps) => {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(items.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = items.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (pageNumber:any) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="flex flex-col items-center">
            <div className="grid p-5 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {currentItems.map((item:any) => (
                    <MinItemCard key={item.item_id} {...item} />
                ))}
            </div>

            <div className="flex gap-2 mt-4 py-4">
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                >
                    Previous
                </button>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        className={`px-4 py-2 ${
                            currentPage === index + 1
                                ? 'bg-blue-700 text-white'
                                : 'bg-gray-300'
                        } rounded-lg hover:bg-blue-500 transition`}
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default PaginatedGrid;