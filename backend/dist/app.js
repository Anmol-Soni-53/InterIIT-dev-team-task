"use strict";
// interface Warehouse {
//     id: number;
//     godown_id: string;
//     name: string;
//     children: Warehouse[];
//     Item: any[]; // You can replace `any` with a more specific type if needed
//   }
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
//   const warehouses: Warehouse[] = [
//     {
//       id: 86,
//       godown_id: "cf46ac14da30428694619096ce991a2b",
//       name: "Davis-Stewart Warehouse",
//       children: [],
//       Item: []
//     },
//     {
//       id: 1,
//       godown_id: "d72518e97c3f4a68979153f2b8e9308e",
//       name: "Torres, Rowland and Peters Warehouse",
//       children: [
//         {
//           id: 96,
//           godown_id: "cf46ac14da30428694619096ce991a2b",
//           name: "Nested Davis-Stewart Warehouse",
//           children: [
//             {
//               id: 97,
//               godown_id: "nested-godown-id",
//               name: "Further Nested Warehouse",
//               children: [],
//               Item: []
//             }
//           ],
//           Item: []
//         },
//       ],
//       Item: []
//     }
//   ];
//   // Function to find a warehouse by id recursively
//   function findWarehouseById(id: number, warehouses: Warehouse[]): Warehouse | null {
//     for (const warehouse of warehouses) {
//       if (warehouse.id === id) {
//         return warehouse; // Return if found
//       }
//       // Search in children if exists
//       const foundInChildren = findWarehouseById(id, warehouse.children);
//       if (foundInChildren) {
//         return foundInChildren; // Return if found in children
//       }
//     }
//     return null; // Return null if not found
//   }
//   // Function to update a warehouse by id recursively
//   function updateWarehouseById(id: number, updatedData: Partial<Warehouse>, warehouses: Warehouse[]): Warehouse[] {
//     return warehouses.map(warehouse => {
//       if (warehouse.id === id) {
//         return { ...warehouse, ...updatedData }; // Update if found
//       }
//       // Update children if exists
//       return {
//         ...warehouse,
//         children: updateWarehouseById(id, updatedData, warehouse.children) // Update children recursively
//       };
//     });
//   }
//   // Example usage to find a warehouse
//   console.log("hi there",warehouses[1].children[0])
//   const foundWarehouse = findWarehouseById(97, warehouses);
//   console.log('Found Warehouse:', foundWarehouse);
//   // Example usage to update the warehouse with id 97
//   const updatedWarehouses = updateWarehouseById(97, { name: "Updated Further Nested Warehouse" }, warehouses);
//   console.log('Updated Warehouses:', JSON.stringify(updatedWarehouses, null, 2));
var client_1 = require("@prisma/client");
var prisma = new client_1.PrismaClient();
var fixLevels = function () { return __awaiter(void 0, void 0, void 0, function () {
    var children;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.godown.findMany({
                    where: {},
                    select: {
                        level: true,
                        parentGodownId: true,
                        children: {
                            select: {
                                id: true,
                                godown_id: true,
                                parentGodownId: true,
                            },
                        }
                    },
                })];
            case 1:
                children = _a.sent();
                console.log(children);
                return [2 /*return*/];
        }
    });
}); };
fixLevels();
