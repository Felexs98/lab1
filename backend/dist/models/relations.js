"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("./User"));
const Event_1 = __importDefault(require("./Event"));
const RefreshToken_1 = __importDefault(require("./RefreshToken"));
// Устанавливаем связи моделей
User_1.default.hasMany(Event_1.default, { foreignKey: "createdBy" });
Event_1.default.belongsTo(User_1.default, { foreignKey: "createdBy" });
User_1.default.hasMany(RefreshToken_1.default, { foreignKey: "userId" });
RefreshToken_1.default.belongsTo(User_1.default, { foreignKey: "userId" });
console.log("Модельные связи установлены.");
