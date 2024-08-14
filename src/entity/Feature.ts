import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class Feature extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column('jsonb')
    geometry!: {
        type: string;
        coordinates: number[][][];
    };

    @Column({ nullable: true })
    FID!: number;

    @Column()
    name!: string;

    @Column()
    type!: string;
}

export const createFeature = async (
    geometry: { type: string; coordinates: number[][][] },
    FID: number,
    name: string,
    type: string
) => {
    const feature = new Feature();
    feature.geometry = geometry;
    feature.FID = FID;
    feature.name = name;
    feature.type = type;

    await feature.save();
    return feature;
};

export const findFeatureById = async (id: number) => {
    return Feature.findOne({ where: { id } });
};

export const listFeatures = async () => {
    return Feature.find();
};

export const updateFeature = async (
    id: number,
    geometry: { type: string; coordinates: number[][][] },
    FID: number,
    name: string,
    type: string
) => {
    const feature = await Feature.findOne({ where: { id } });
    if (!feature) return null;
    feature.geometry = geometry;
    feature.FID = FID;
    feature.name = name;
    feature.type = type;

    await feature.save();
    return feature;
};

export const deleteFeature = async (id: number) => {
    const feature = await Feature.findOne({ where: { id } });
    if (!feature) throw new Error("Feature not found");
    await feature.remove();
    return true;
};
