import { useEffect, useState } from "react";
import MinItemCard from "./min-item-card";
import { useParams } from "react-router-dom";
import { Button } from "./ui/button";
import { Home, Search } from 'lucide-react'
import { useNavigate } from "react-router-dom";
import { Spinner } from "./spinner";
import axios from "axios";
import PaginatedGrid from "./pagination";
interface Item {
    item_id: string,
    parentGodownId: string,
    name: string,
    quantity: number,
    price: number,
    brand: string,
}
const ItemType = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const [search, setSearch] = useState<any>()
    const [perPage, setPerPage] = useState<number>(10);
    useEffect(() => {
        const mediaQueryL = window.matchMedia('(min-width: 1024px)');
        const mediaQueryM = window.matchMedia('(min-width: 768px)');
        const mediaQueryS = window.matchMedia('(min-width: 640px)');

        const handleMediaChange = () => {
            if (mediaQueryL.matches) {
                setPerPage(10);
            } else if (mediaQueryM.matches) {
                setPerPage(6);
            } else if (mediaQueryS.matches) {
                setPerPage(3);
            } else {
                setPerPage(3);
            }
        };

        handleMediaChange();

        mediaQueryL.addEventListener('change', handleMediaChange);
        mediaQueryM.addEventListener('change', handleMediaChange);
        mediaQueryS.addEventListener('change', handleMediaChange);

        return () => {
            mediaQueryL.removeEventListener('change', handleMediaChange);
            mediaQueryM.removeEventListener('change', handleMediaChange);
            mediaQueryS.removeEventListener('change', handleMediaChange);
        };
    }, []);

    useEffect(() => {
        if (!token) {
            navigate('/user/login')
        }

    }, [token])
    const { type } = useParams();
    const [items, setItems] = useState<Item[]>([])
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        const fetchType = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${apiUrl}/item/filter/${type}`, {
                    headers: {
                        'searchHeader': search
                    }
                });
                const fetchedData = response.data;
                setItems(fetchedData)
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }
            finally {
                setLoading(false);
            }
        }
        console.log(type);
        if (type) {
            fetchType();
        }
    }, [type, search])



    const types = ["Toys", "Clothing", "Furniture", "Electronics", "Tools"]
    return (
        <>
            <div className="md:flex gap-4 p-2 items-center justify-center">
                <div>
                    <Home className="w-8 h-8 text-black hover:cursor-pointer" onClick={() => {
                        navigate('/')
                    }} />
                </div>
                {types.map((element, index) => {
                    return (
                        <Button key={index} className='bg-gradient-to-br from-purple-400 to to-blue-600' name={element} onClick={(e) => {
                            navigate('/filter/' + e.currentTarget.name)
                        }}>{element}</Button>
                    );
                })}
            </div>
            <div className="py-6 flex flex-col justify-center items-center">
                <div className="shadow-lg flex gap-3 items-center p-4 justify-between rounded-lg w-full max-w-md">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="text-xl rounded-lg p-2 font-semibold outline-none"
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                        }}
                    />
                    {/* <button >
                        <Search cla />
                    </button> */}
                </div>
            </div>

            {
                loading ? (<div className="flex h-screen flex-col items-center justify-center">
                    <Spinner>Loading...</Spinner>
                </div>) :
                    (
                        <PaginatedGrid items={items} itemsPerPage={perPage} />
                    )
            }

        </>

    );
}

export default ItemType;