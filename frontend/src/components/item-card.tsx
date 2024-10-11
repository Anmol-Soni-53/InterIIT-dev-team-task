// // import { useEffect, useState } from "react";
// import { Badge } from "@/components/ui/badge"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Separator } from "@/components/ui/separator"
// import { Package, DollarSign, Warehouse, Wrench, Info } from "lucide-react"
// import { ItemProps } from "@/types"
// import { useState } from "react"

// export default function ItemCard({ item }: { item: ItemProps }) {

//     const formatPrice = (price: number) => {
//         return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price)
//     }

//     const formatAttributeValue = (value: string | number | boolean) => {
//         if (typeof value === 'boolean') {
//             return value ? 'Yes' : 'No'
//         }
//         return value.toString()
//     }

//     const capitalizeFirstLetter = (string: string) => {
//         return string.charAt(0).toUpperCase() + string.slice(1)
//     }
//     const [loading, setLoading] = useState<Boolean>(true);
//     return (
//         <Card className="w-full max-w-4xl mx-auto">
//             <CardHeader>
//                 <CardTitle className="text-2xl font-bold">{item.name}</CardTitle>
//             </CardHeader>
//             <CardContent>
//                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                     <div className="flex flex-col items-center justify-center">
//                         {loading && (
//                             <div className="h-24 w-24 animate-pulse bg-gray-300 rounded-lg" /> // Skeleton Loader
//                         )}
//                         <img
//                             src={item.image_url}
//                             alt={item.name}
//                             className={`rounded-lg object-cover ${loading ? 'hidden' : 'block'} 
//                       w-25 h-25 sm:w-50 sm:h-50 md:w-75 md:h-75 lg:w-200 lg:h-200`}
//                             onLoad={() => setLoading(false)} // Set loading to false when the image is loaded
//                         />
//                     </div>
//                     <div className="space-y-4">
//                         <div className="flex items-center justify-between">
//                             <Badge variant={item.status === 'out_of_stock' ? 'destructive' : 'default'} className="text-sm">
//                                 {item.status === 'out_of_stock' ? 'Out of Stock' : 'In Stock'}
//                             </Badge>
//                             <span className="text-2xl font-bold">{formatPrice(item.price)}</span>
//                         </div>
//                         <Separator />
//                         <div className="space-y-2">
//                             <div className="flex items-center space-x-2">
//                                 <Package className="w-5 h-5 text-muted-foreground" />
//                                 <span>Quantity: {item.quantity}</span>
//                             </div>
//                             <div className="flex items-center space-x-2">
//                                 <DollarSign className="w-5 h-5 text-muted-foreground" />
//                                 <span>Category: {item.category}</span>
//                             </div>
//                             <div className="flex items-center space-x-2">
//                                 <Warehouse className="w-5 h-5 text-muted-foreground" />
//                                 <span>Godown ID: {item.parentGodownId}</span>
//                             </div>
//                             <div className="flex items-center space-x-2">
//                                 <Wrench className="w-5 h-5 text-muted-foreground" />
//                                 <span>Brand: {item.brand}</span>
//                             </div>
//                         </div>
//                         <Separator />
//                         <div className="space-y-2">
//                             <h3 className="text-lg font-semibold">Attributes</h3>
//                             {Object.entries(item.attributes).map(([key, value]) => (
//                                 <div key={key} className="flex items-center space-x-2">
//                                     <Info className="w-5 h-5 text-muted-foreground" />
//                                     <span>{capitalizeFirstLetter(key.replace('_', ' '))}: {formatAttributeValue(value)}</span>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 </div>
//             </CardContent>
//         </Card>
//     )
// }
'use client'

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Package, DollarSign, Warehouse, Wrench, Info } from "lucide-react"
import { ItemProps } from "@/types"

export default function ItemCard({ item }: { item: ItemProps }) {
  const [loading, setLoading] = useState<boolean>(true)
  const [isHovered, setIsHovered] = useState<boolean>(false)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price)
  }

  const formatAttributeValue = (value: string | number | boolean) => {
    if (typeof value === 'boolean') {
      return value ? 'Yes' : 'No'
    }
    return value.toString()
  }

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  return (
    <Card
      className=" max-h-fit lg:max-h-none lg:h-full  max-w-3xl mx-auto transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-lg">
        <CardTitle className="text-2xl font-bold">{item.name}</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1  lg:grid-cols-2 gap-6 max-h-screen">
          <div className=" flex flex-col items-center justify-center max-h-32 lg:max-h-none lg:h-full">
            {loading && (
              <div className="h-full w-48 animate-pulse bg-gray-300 rounded-lg" />
            )}
            <div className="h-full overflow-hidden flex items-center justify-center">
              <img
                src={item.image_url}
                alt={item.name}
                className={`w-full h-full object-cover rounded-lg ${loading ? 'hidden' : 'block'} 
          transition-all duration-300 ease-in-out ${isHovered ? 'scale-105' : 'scale-100'}`}
                onLoad={() => setLoading(false)}
              />
            </div>

          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Badge
                variant={item.status === 'out_of_stock' ? 'destructive' : 'default'}
                className={`text-sm ${item.status === 'out_of_stock' ? 'animate-pulse' : 'animate-bounce'}`}
              >
                {item.status === 'out_of_stock' ? 'Out of Stock' : 'In Stock'}
              </Badge>
              <span className="text-2xl font-bold text-emerald-600">{formatPrice(item.price)}</span>
            </div>
            <Separator className="bg-gradient-to-r from-purple-500 to-pink-500" />
            <div className="flex flex-col gap-2">
              <div className="space-y-3">
                <div className="flex items-center space-x-2 transition-all duration-300 ease-in-out hover:translate-x-2">
                  <Package className="w-5 h-5 text-blue-500" />
                  <span>Quantity: <span className="font-semibold text-blue-700">{item.quantity}</span></span>
                </div>
                <div className="flex items-center space-x-2 transition-all duration-300 ease-in-out hover:translate-x-2">
                  <DollarSign className="w-5 h-5 text-green-500" />
                  <span>Category: <span className="font-semibold text-green-700">{item.category}</span></span>
                </div>
                <div className="flex items-center space-x-2 transition-all duration-300 ease-in-out hover:translate-x-2">
                  <Warehouse className="w-5 h-5 text-yellow-500" />
                  <div className="flex items-center flex-wrap">
                    <span>Godown ID:</span>
                    <span className="pl-2 font-medium text-sm text-yellow-700 truncate max-w-full">
                      {item.parentGodownId}
                    </span>
                  </div>
                </div>

                {/* <div className="flex items-center space-x-2 transition-all duration-300 ease-in-out hover:translate-x-2">
                  <span>Godown ID: <span className="font-semibold text-sm text-yellow-700 ">{item.parentGodownId}</span> </span>
                </div> */}
                <div className="flex items-center space-x-2 transition-all duration-300 ease-in-out hover:translate-x-2">
                  <Wrench className="w-5 h-5 text-red-500" />
                  <span>Brand: <span className="font-semibold text-red-700">{item.brand}</span></span>
                </div>
              </div>
              <Separator className="bg-gradient-to-r from-purple-500 to-pink-500" />
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-purple-600">Attributes</h3>
                {Object.entries(item.attributes).map(([key, value]) => (
                  <div key={key} className="flex items-center space-x-2 transition-all duration-300 ease-in-out hover:translate-x-2">
                    <Info className="w-5 h-5 text-indigo-500" />
                    <span>
                      {capitalizeFirstLetter(key.replace('_', ' '))}:
                      <span className="font-semibold text-indigo-700"> {formatAttributeValue(value)}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}