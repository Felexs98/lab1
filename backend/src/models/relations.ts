import User from "./User";
import Event from "./Event";
import RefreshToken from "./RefreshToken";
import Participant from "./Participant";

// Автор события
User.hasMany(Event, { foreignKey: "createdBy" });
Event.belongsTo(User, { foreignKey: "createdBy" });

// Refresh tokens
User.hasMany(RefreshToken, { foreignKey: "userId" });
RefreshToken.belongsTo(User, { foreignKey: "userId" });

// Участники мероприятия (важно: as: 'Participants'!)
User.belongsToMany(Event, { through: Participant, foreignKey: "userId", otherKey: "eventId" });
Event.belongsToMany(User, { through: Participant, foreignKey: "eventId", otherKey: "userId", as: 'Participants' }); // ← обязательно as: 'Participants'
