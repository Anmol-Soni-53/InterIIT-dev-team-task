interface Warehouse {
    id: number;
    godown_id: string;
    name: string;
    children: Warehouse[];
    Item: any[]; // You can replace `any` with a more specific type if needed
  }

  const warehouses: Warehouse[] = [
    {
      id: 86,
      godown_id: "cf46ac14da30428694619096ce991a2b",
      name: "Davis-Stewart Warehouse",
      children: [],
      Item: []
    },
    {
      id: 1,
      godown_id: "d72518e97c3f4a68979153f2b8e9308e",
      name: "Torres, Rowland and Peters Warehouse",
      children: [
        {
          id: 96,
          godown_id: "cf46ac14da30428694619096ce991a2b",
          name: "Nested Davis-Stewart Warehouse",
          children: [
            {
              id: 97,
              godown_id: "nested-godown-id",
              name: "Further Nested Warehouse",
              children: [],
              Item: []
            }
          ],
          Item: []
        },
      ],
      Item: []
    }
  ];

  // Function to find a warehouse by id recursively
  function findWarehouseById(id: number, warehouses: Warehouse[]): Warehouse | null {
    for (const warehouse of warehouses) {
      if (warehouse.id === id) {
        return warehouse; // Return if found
      }
      // Search in children if exists
      const foundInChildren = findWarehouseById(id, warehouse.children);
      if (foundInChildren) {
        return foundInChildren; // Return if found in children
      }
    }
    return null; // Return null if not found
  }

  // Function to update a warehouse by id recursively
  function updateWarehouseById(id: number, updatedData: Partial<Warehouse>, warehouses: Warehouse[]): Warehouse[] {
    return warehouses.map(warehouse => {
      if (warehouse.id === id) {
        return { ...warehouse, ...updatedData }; // Update if found
      }
      // Update children if exists
      return {
        ...warehouse,
        children: updateWarehouseById(id, updatedData, warehouse.children) // Update children recursively
      };
    });
  }

  // Example usage to find a warehouse
  console.log("hi there",warehouses[1].children[0])
  const foundWarehouse = findWarehouseById(97, warehouses);
  console.log('Found Warehouse:', foundWarehouse);

  // Example usage to update the warehouse with id 97
  const updatedWarehouses = updateWarehouseById(97, { name: "Updated Further Nested Warehouse" }, warehouses);
  console.log('Updated Warehouses:', JSON.stringify(updatedWarehouses, null, 2));
// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();
// const fixLevels = async () => {
//   const children = await prisma.godown.findMany({
//     where: {},
//     select: {
//       level: true,
//       parentGodownId:true,
//       children: {
//         select: {
//           id: true,
//           godown_id: true,
//           parentGodownId:true,
//         },
//       }
//     },
//   });
//   console.log(children)
// };

// fixLevels();