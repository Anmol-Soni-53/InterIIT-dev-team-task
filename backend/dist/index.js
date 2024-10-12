"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var app = (0, express_1.default)();
var port = 3000;
app.use((0, cors_1.default)());
var client_1 = require("@prisma/client");
var prisma = new client_1.PrismaClient();
var iData_1 = require("./iData");
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var newItems, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, prisma.item.createMany({
                            data: iData_1.itemData,
                            skipDuplicates: true, // Optional: skips records that would violate unique constraints
                        })];
                case 1:
                    newItems = _a.sent();
                    console.log("".concat(newItems.count, " godowns inserted."));
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _a.sent();
                    console.error("Error inserting items:", err_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
// main();
app.get("/favicon.ico", function (req, res) {
    res.status(204).end();
});
app.get("/root", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var children;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.godown.findMany({
                    where: {
                        parentGodownId: null,
                    },
                    select: {
                        id: true,
                        godown_id: true,
                        name: true,
                        children: {
                            select: {
                                id: true,
                                godown_id: true,
                                name: true,
                            },
                        },
                        Item: {
                            select: {
                                id: true,
                                item_id: true,
                                name: true,
                            },
                        },
                    },
                })];
            case 1:
                children = _a.sent();
                res.send(children);
                return [2 /*return*/];
        }
    });
}); });
app.get("/item/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, item;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, prisma.item.findUnique({
                        where: {
                            item_id: id,
                        },
                    })];
            case 1:
                item = _a.sent();
                res.send(item);
                return [2 /*return*/];
        }
    });
}); });
app.get("/filter/:type", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var type, items;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                type = req.params.type;
                return [4 /*yield*/, prisma.item.findMany({
                        where: {
                            category: type,
                        },
                        select: {
                            item_id: true,
                            parentGodownId: true,
                            name: true,
                            quantity: true,
                            price: true,
                            brand: true,
                        },
                    })];
            case 1:
                items = _a.sent();
                res.send(items);
                return [2 /*return*/];
        }
    });
}); });
app.get("/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, children;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, prisma.godown.findUnique({
                        where: {
                            godown_id: id,
                        },
                        select: {
                            id: true,
                            godown_id: true,
                            name: true,
                            children: {
                                select: {
                                    id: true,
                                    godown_id: true,
                                    name: true,
                                },
                            },
                            Item: {
                                select: {
                                    id: true,
                                    item_id: true,
                                    name: true,
                                },
                            },
                        },
                    })];
            case 1:
                children = _a.sent();
                // console.log(children?.children)
                res.send(children);
                return [2 /*return*/];
        }
    });
}); });
app.listen(port, function () {
    return console.log("Express server is listening at http://localhost:".concat(port, " \uD83D\uDE80"));
});
