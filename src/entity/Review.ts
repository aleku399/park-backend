import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class Review extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    date!: string;

    @Column("text")
    comments!: string;

    @Column("text")
    issues!: string;

    @Column()
    rating!: string;

    @Column()
    location!: string;
}

export const createReview = async (
    date: string,
    comments: string,
    issues: string,
    rating: string,
    location: string
) => {
    const review = new Review();
    review.date = date;
    review.comments = comments;
    review.issues = issues;
    review.rating = rating;
    review.location = location;

    await review.save();
    return review;
};

export const findReviewById = async (id: number) => {
    return Review.findOne({
        where: { id },
    });
};

export const listReviews = async () => {
    return Review.find();
};

export const updateReview = async (
    id: number,
    date: string,
    comments: string,
    issues: string,
    rating: string,
    location: string
) => {
    const review = await Review.findOne({ where: { id } });
    if (!review) return null;
    review.date = date;
    review.comments = comments;
    review.issues = issues;
    review.rating = rating;
    review.location = location;

    await review.save();
    return review;
};

export const deleteReview = async (id: number) => {
    const review = await Review.findOne({ where: { id } });
    if (!review) throw new Error("Review not found");
    await review.remove();
    return true;
};
