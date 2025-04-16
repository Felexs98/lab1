import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "@config/db";

interface EventAttributes {
  id: string;
  title: string;
  description?: string;
  date: Date;
  category: "концерт" | "лекция" | "выставка" | "семинар" | "фестиваль";
  createdBy: string;
}

type EventCreationAttributes = Optional<EventAttributes, "id">;

class EventModel
  extends Model<EventAttributes, EventCreationAttributes>
  implements EventAttributes
{
  public id!: string;
  public title!: string;
  public description?: string;
  public date!: Date;
  public category!: EventAttributes["category"];
  public createdBy!: string;
}

const Event = sequelize.define<EventModel>(
  "Event",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    category: {
      type: DataTypes.ENUM(
        "концерт",
        "лекция",
        "выставка",
        "семинар",
        "фестиваль",
      ),
      allowNull: false,
      defaultValue: "лекция",
    },
    createdBy: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
      onDelete: "CASCADE",
    },
  },
  {
    timestamps: false,
  },
);

export default Event;
