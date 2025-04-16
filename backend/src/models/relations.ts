import User from "./User";
import Event from "./Event";
import RefreshToken from "./RefreshToken";

// Устанавливаем связи моделей
User.hasMany(Event, { foreignKey: "createdBy" });
Event.belongsTo(User, { foreignKey: "createdBy" });

User.hasMany(RefreshToken, { foreignKey: "userId" });
RefreshToken.belongsTo(User, { foreignKey: "userId" });

console.log("Модельные связи установлены.");
