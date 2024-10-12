import useStore from '@/store';
import ItemCard from './item-card';
import { useEffect, useState } from 'react';
import { ItemProps } from '@/types';
import { Spinner } from './spinner';
import { motion } from 'framer-motion'
import Navigation from './navigation';
import { Button } from './ui/button';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function Details() {
    const navigate = useNavigate();
    const token=localStorage.getItem("token");
    useEffect(()=>{
        if(!token){
            navigate('/user/login')   
        }

    },[token])
    const itemId = useStore((state) => state.itemId);
    const [item, setItem] = useState<ItemProps | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true); 
            try {
                const response = await axios.get(`http://localhost:3000/item/${itemId}`);
                const data = response.data;
                setItem(data);
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            } finally {
                setLoading(false); 
            }
        };
       
        if (itemId !== "") {
            fetchData();
        }

    }, [itemId]);

    useEffect(() => {
        if (itemId === "") {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto'; 
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [itemId]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.5,
                when: "beforeChildren",
                staggerChildren: 0.2
            }
        }
    }

    const childVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 100 }
        }
    }
    const types = ["Toys", "Clothing", "Furniture", "Electronics", "Tools"]
    return (
        <>
            {itemId === "" ? (
                <motion.div
                    className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    <div className=" flex flex-col items-center justify-center h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 text-center p-8">
                        <motion.h1 className="text-4xl font-extrabold text-white mb-4 shadow-text" variants={childVariants} >
                            Welcome to the Warehouse Management System
                        </motion.h1>
                        <motion.h3 className="text-xl font-medium text-white mb-2 shadow-text" variants={childVariants}>
                            Manage Your Inventory Efficiently
                        </motion.h3>
                        <motion.p className="mt-4 text-white text-lg shadow-text" variants={childVariants}>
                            Please select a warehouse from the sidebar to view its details and manage your stock effectively
                        </motion.p>
                        <br />
                        <motion.h3 className="text-xl font-medium text-white mb-2 shadow-text" variants={childVariants}>
                            OR
                        </motion.h3>
                        <motion.p className="mt-4 text-white text-lg shadow-text" variants={childVariants}>
                            Please select a Category to see its stocks
                        </motion.p>
                        <motion.div className="mt-4 flex gap-2  text-white text-lg shadow-text" variants={childVariants} >
                            {types.map((element, index) => {
                                return (
                                    <Button key={index} className='bg-gradient-to-br from-purple-400 to to-blue-600' name={element} onClick={(e) => {
                                        navigate('/filter/' + e.currentTarget.name)
                                    }}>{element}</Button>
                                );
                            })}
                        </motion.div>
                        <motion.p className="mt-12 text-white italic shadow-text" variants={childVariants}>
                            Your success is our priority!
                        </motion.p>
                    </div>
                </motion.div>
            ) : (
                <div>
                    {
                        loading ? (
                            <div >
                                <Spinner>Loading</Spinner>
                            </div >
                        ) : item ? (  
                            <div >
                                <Navigation/>
                                <div >
                                    <br />
                                    <div className=' flex justify-center'>
                                        <ItemCard item={item} />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <p>No item found.</p>  
                        )
                    }
                </div >
            )}


        </>
    );
}

// import useStore from '@/store';
// import ItemCard from './item-card';
// import { useEffect, useState } from 'react';
// import { ItemProps } from '@/types';
// import { Spinner } from './spinner';
// export default function Details() {
//     const itemId = useStore((state) => state.itemId);
//     const [item,setItem]=useState<ItemProps|null>();
//     const [loading, setLoading] = useState<boolean>(true);
//     useEffect(() => {

//         const fetchData = async () => {
//           setLoading(true); // Set loading to true when fetching starts
//           try {
//             const response = await fetch(`http://localhost:3000/item/${itemId}`);
//             if (!response.ok) {
//               throw new Error('Network response was not ok');
//             }
//             const data = await response.json();
//             setItem(data);
//           } catch (error) {
//             console.error('There was a problem with the fetch operation:', error);
//           } finally {
//             setLoading(false); // Set loading to false when fetching completes
//           }
//         };
//         if(itemId!==""){
//             fetchData();
//         }
//       }, [itemId]);

//     return (
//         <>
//             {itemId === "" ? (
//                 <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-white to-blue-200 text-center p-8">
//                     <h1 className="text-3xl font-extrabold text-gray-800 mb-4">
//                         Welcome to the Warehouse Management System
//                     </h1>
//                     <h3 className="text-lg font-medium text-gray-700 mb-2">
//                         Manage Your Inventory Efficiently
//                     </h3>
//                     <p className="mt-4 text-gray-600">
//                         Please select a warehouse from the sidebar to view its details and manage your stock effectively.
//                     </p>
//                     <p className="mt-2 text-gray-500 italic">
//                         Your success is our priority!
//                     </p>
//                 </div>
//             ) : (

//                 <div>
//                 {loading ? (

//                         <div className=' h-screen flex items-center justify-center'><Spinner>Loading</Spinner></div>

//                 ) : item ? (  // Only render ItemCard when item is not null
//                   <ItemCard item={item} />
//                 ) : (
//                   <p>No item found.</p>  // Optional: Display a message if item is still null
//                 )}
//               </div>

//             )}
//         </>
//     );
// }


// import useStore from '@/store'
// import ItemCard from './item-card'
// import { useEffect, useState } from 'react'
// import { ItemProps } from '@/types'
// import { Spinner } from './spinner'
// import { motion } from 'framer-motion'

// export default function Details() {
//   const itemId = useStore((state) => state.itemId)
//   const [item, setItem] = useState<ItemProps | null>(null)
//   const [loading, setLoading] = useState<boolean>(true)

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true)
//       try {
//         const response = await fetch(`http://localhost:3000/item/${itemId}`)
//         if (!response.ok) {
//           throw new Error('Network response was not ok')
//         }
//         const data = await response.json()
//         setItem(data)
//       } catch (error) {
//         console.error('There was a problem with the fetch operation:', error)
//       } finally {
//         setLoading(false)
//       }
//     }
//     if (itemId !== "") {
//       fetchData()
//     }
//   }, [itemId])

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         duration: 0.5,
//         when: "beforeChildren",
//         staggerChildren: 0.2
//       }
//     }
//   }

//   const childVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: { type: "spring", stiffness: 100 }
//     }
//   }

//   return (
//     <motion.div
//       className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500"
//       initial="hidden"
//       animate="visible"
//       variants={containerVariants}
//     >
//       {itemId === "" ? (
//         <div className="flex flex-col items-center justify-center h-screen text-center p-8">
//           <motion.h1
//             className="text-4xl font-extrabold text-white mb-4 shadow-text"
//             variants={childVariants}
//           >
//             Welcome to the Warehouse Management System
//           </motion.h1>
//           <motion.h3
//             className="text-xl font-medium text-white mb-2 shadow-text"
//             variants={childVariants}
//           >
//             Manage Your Inventory Efficiently
//           </motion.h3>
//           <motion.p
//             className="mt-4 text-white text-lg shadow-text"
//             variants={childVariants}
//           >
//             Please select a warehouse from the sidebar to view its details and manage your stock effectively.
//           </motion.p>
//           <motion.p
//             className="mt-2 text-white italic shadow-text"
//             variants={childVariants}
//           >
//             Your success is our priority!
//           </motion.p>
//         </div>
//       ) : (
//         <div className="bg-green-500 flex flex-col items-center justify-center ">
//           {loading ? (
//             <motion.div
//               initial={{ scale: 0 }}
//               animate={{ scale: 1 }}
//               transition={{ type: "spring", stiffness: 260, damping: 20 }}
//             >
//               <Spinner>Loading</Spinner>
//             </motion.div>
//           ) : item ? (
//             <motion.div
//               initial={{ scale: 0.8, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               transition={{ type: "spring", stiffness: 260, damping: 20 }}
//               className="bg-white rounded-lg shadow-2xl p-6 m-4 w-full"
//             >
//               <ItemCard item={item} />
//             </motion.div>
//           ) : (
//             <motion.p
//               className="text-white text-xl font-bold shadow-text"
//               variants={childVariants}
//             >
//               No item found.
//             </motion.p>
//           )}
//         </div>
//       )}
//     </motion.div>
//   )
// }

// import useStore from '@/store';
// import ItemCard from './item-card';
// import { useEffect, useState } from 'react';
// import { ItemProps } from '@/types';
// import { Spinner } from './spinner';
// import { motion } from 'framer-motion'
// export default function Details() {

//     const containerVariants = {
//         hidden: { opacity: 0 },
//         visible: {
//             opacity: 1,
//             transition: {
//                 duration: 0.5,
//                 when: "beforeChildren",
//                 staggerChildren: 0.2
//             }
//         }
//     }

//     const childVariants = {
//         hidden: { y: 20, opacity: 0 },
//         visible: {
//             y: 0,
//             opacity: 1,
//             transition: { type: "spring", stiffness: 100 }
//         }
//     }

//     const itemId = useStore((state) => state.itemId);
//     const [item, setItem] = useState<ItemProps | null>();
//     const [loading, setLoading] = useState<boolean>(true);
//     useEffect(() => {

//         const fetchData = async () => {
//             setLoading(true); // Set loading to true when fetching starts
//             try {
//                 const response = await fetch(`http://localhost:3000/item/${itemId}`);
//                 if (!response.ok) {
//                     throw new Error('Network response was not ok');
//                 }
//                 const data = await response.json();
//                 setItem(data);
//             } catch (error) {
//                 console.error('There was a problem with the fetch operation:', error);
//             } finally {
//                 setLoading(false); // Set loading to false when fetching completes
//             }
//         };
//         if (itemId !== "") {
//             fetchData();
//         }
//     }, [itemId]);

//     return (
//         <>
//             {itemId === "" ? (
//                 <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-white to-blue-200 text-center p-8">
//                     <h1 className="text-3xl font-extrabold text-gray-800 mb-4">
//                         Welcome to the Warehouse Management System
//                     </h1>
//                     <h3 className="text-lg font-medium text-gray-700 mb-2">
//                         Manage Your Inventory Efficiently
//                     </h3>
//                     <p className="mt-4 text-gray-600">
//                         Please select a warehouse from the sidebar to view its details and manage your stock effectively.
//                     </p>
//                     <p className="mt-2 text-gray-500 italic">
//                         Your success is our priority!
//                     </p>
//                 </div>
//             ) : (

//                 <div>
//                     {loading ? (

//                         <div className=' h-screen flex items-center justify-center'><Spinner>Loading</Spinner></div>
//                     ) : item ? (  // Only render ItemCard when item is not null
//                         <ItemCard item={item} />
//                     ) : (
//                         <p>No item found.</p>  // Optional: Display a message if item is still null
//                     )}
//                 </div>

//             )}
//         </>
//     );
// }
