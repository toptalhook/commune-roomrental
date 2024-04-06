'use client';

import { useState } from "react";
import ReviewCard from "./ReviewCard";
import ReviewModal from "./ReviewModal";

interface ReviewCardProps {
    name: string,
    score: string,
    location: string,
    description: string,
}

interface ReviewInfoProps {
    reviews: ReviewCardProps[]

}

const ReviewInfo: React.FC<ReviewInfoProps> = ({
    reviews,

}) => {

    const [isOpen, setIsOpen] = useState(false);

    const closeModal = () => {
        setIsOpen(false);
    }

    return (
        <>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 py-10">
                {
                    reviews?.map((item, index) => {
                        return (
                            (index < 6) && <ReviewCard
                                name={item.name}
                                score={item.score}
                                location={item.location}
                                description={item.description} />
                        )
                    })}

            </div>
            {
                reviews?.length >= 7
                &&
                <button
                    onClick={() => setIsOpen(true)}
                    className="px-4 py-2 border-black   border-[1px] rounded-md">
                    Show all {reviews?.length} reviews
                </button>
            }
            {
                isOpen
                &&
                <ReviewModal reviews={reviews} closeModal={closeModal} />
            }
        </>
    );
}

export default ReviewInfo;