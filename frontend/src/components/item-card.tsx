// import { useEffect, useState } from "react";

const ItemCard = async ({ item_id }: any) => {
    // interface Item {
    //     id: string
    //     name: string
    //     item_id: string
    //   }
    // const [isloading, setIsLoading] = useState<Boolean>(false)
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             // setLoading(true);
    //             const response = await fetch(`http://localhost:3000/${item_id}`);
    //             const fetchedData = await response.json();

    //             // Update the tree with the fetched data
    //             // setLoading(false);
    //             // Mark the node as received
    //             // setLoaded(prev => [...prev, id]);
    //         } catch (error) {
    //             console.error('There was a problem with the fetch operation:', error);
    //         }
    //     }
    // })
    return (
        <p>{item_id}</p>
    );
}

export default ItemCard;