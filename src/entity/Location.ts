import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class Location extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string; 

    @Column("decimal", { precision: 10, scale: 8 })
    lat!: number;

    @Column("decimal", { precision: 11, scale: 8 })
    lng!: number;

    @Column({ nullable: true })
    icon!: string;
}

export const createLocation = async (
    title: string,
    lat: number,
    lng: number,
    icon: string
) => {
    const location = new Location();
    location.title = title;
    location.lat = lat;
    location.lng = lng;
    location.icon = icon;

    await location.save();
    return location;
};

export const findLocationById = async (id: number) => {
    return Location.findOne({
      where: { id },
    });
};

export const listLocations = async () => {
    return Location.find();
};

export const updateLocation = async (
    id: number,
    title: string,
    lat: number,
    lng: number,
    icon: string
) => {
    const location = await Location.findOne({ where: { id } });
    if (!location) return null;
    location.title = title;
    location.lat = lat;
    location.lng = lng;
    location.icon = icon;

    await location.save();
    return location;
};

export const deleteLocation = async (id: number) => {
    const location = await Location.findOne({ where: { id } });
    if (!location) throw new Error("Location not found");
    await location.remove();
    return true;
};
