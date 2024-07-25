"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addingRestaurant = exports.adminloginTypes = exports.adminsignupTypes = void 0;
const zod_1 = require("zod");
exports.adminsignupTypes = zod_1.z.object({
    username: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
    name: zod_1.z.string(),
    mobile: zod_1.z.number(),
});
exports.adminloginTypes = zod_1.z.object({
    username: zod_1.z.string().email(),
    password: zod_1.z.string().min(6)
});
exports.addingRestaurant = zod_1.z.object({
    name: zod_1.z.string(),
    address: zod_1.z.string(),
    contact: zod_1.z.number(),
    email: zod_1.z.string().email()
});
