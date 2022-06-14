"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DialogsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const messages_schema_1 = require("../messages/messages.schema");
const dialog_schema_1 = require("./dialog.schema");
const dialogs_controller_1 = require("./dialogs.controller");
const dialogs_service_1 = require("./dialogs.service");
let DialogsModule = class DialogsModule {
};
DialogsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: dialog_schema_1.Dialog.name, schema: dialog_schema_1.DialogSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: messages_schema_1.Message.name, schema: messages_schema_1.MessageSchema }])
        ],
        providers: [dialogs_service_1.DialogsService],
        controllers: [dialogs_controller_1.DialogsController]
    })
], DialogsModule);
exports.DialogsModule = DialogsModule;
//# sourceMappingURL=dialogs.module.js.map