"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const dialog_schema_1 = require("../dialogs/dialog.schema");
const dialogs_service_1 = require("../dialogs/dialogs.service");
const message_gateway_1 = require("./message.gateway");
const messages_controller_1 = require("./messages.controller");
const messages_schema_1 = require("./messages.schema");
const messages_service_1 = require("./messages.service");
let MessageModule = class MessageModule {
};
MessageModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: messages_schema_1.Message.name, schema: messages_schema_1.MessageSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: dialog_schema_1.Dialog.name, schema: dialog_schema_1.DialogSchema }])
        ],
        providers: [messages_service_1.MessagesService, message_gateway_1.MessageGateway, dialogs_service_1.DialogsService],
        controllers: [messages_controller_1.MessagesController]
    })
], MessageModule);
exports.MessageModule = MessageModule;
//# sourceMappingURL=messages.module.js.map