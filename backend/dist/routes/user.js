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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../types/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const hashing_1 = require("../types/hashing");
const config_1 = require("../config");
const userRouter = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
userRouter.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const { success } = user_1.signupTypes.safeParse(body);
    if (!success) {
        console.log(body);
        return res.status(403).json({
            message: "Incorrect details"
        });
    }
    const existingUser = yield prisma.user.findFirst({
        where: {
            username: body.username
        }
    });
    if (existingUser) {
        return res.status(403).json({
            message: "user already exist"
        });
    }
    try {
        const hashedPassword = yield (0, hashing_1.hashPassword)(body.password);
        const newUser = yield prisma.user.create({
            data: {
                username: body.username,
                //@ts-ignore
                password: hashedPassword,
                name: body.name,
                mobile: body.mobile
            }
        });
        if (newUser) {
            const token = jsonwebtoken_1.default.sign({ userId: newUser.id }, config_1.JWT_SECRET);
            console.log(newUser.id);
            res.status(200).json({
                message: "Signup complete",
                token: token
            });
        }
        else {
            res.status(500).json({
                message: "Internal Server Error"
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}));
userRouter.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const { success } = user_1.loginTypes.safeParse(body);
    if (!success) {
        return res.status(403).json({
            message: "Incorrect details"
        });
    }
    try {
        const eUser = yield prisma.user.findFirst({
            where: {
                username: body.username,
            }
        });
        if (!eUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        const hashPassword = yield (0, hashing_1.comparePassword)(body.password, eUser.password);
        if (!hashPassword) {
            return res.status(401).json({
                message: "Invalid credentails"
            });
        }
        else {
            const token = jsonwebtoken_1.default.sign({ userId: eUser.id }, config_1.JWT_SECRET);
            res.status(200).json({
                message: "Signin complete",
                token: token
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}));
exports.default = userRouter;
