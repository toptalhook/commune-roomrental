'use client'
import React from 'react'

import { TfiSpray } from "react-icons/tfi";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { GoKey } from "react-icons/go";
import { RiMessage2Line } from "react-icons/ri";
import { FiTag } from "react-icons/fi";
import { GrMapLocation } from "react-icons/gr";

import { Rate } from "antd";

import ReviewItem from './ReviewItem'
import ReviewInfo from './ReviewInfo';

import reviews from '@/data/reviews.json';
import Review from './Review';

interface ReviewdetailsProps {
    cleanliness: number,
    accuracy: number,
    check_in: number,
    communication: number,
    location: number,
    value: number,
}
export const Reviewdetails: React.FC<ReviewdetailsProps> = () => {
    return (
        <div className="py-5">
            <div className="hidden sm:block py-10 border-y-[1px]" >

                <h1 className="mb-5 text-2xl">Title</h1>
                <div className="grid grid-cols-6 gap-2">
                    <ReviewItem label="Cleanliness" score={"4.0"} icon={<TfiSpray size={30} />} />
                    <ReviewItem label="Accuracy" score={"4.5"} icon={<IoIosCheckmarkCircleOutline size={30} />} />
                    <ReviewItem label="Check-in" score={"5.0"} icon={<GoKey size={30} />} />
                    <ReviewItem label="Communication" score={"4.7"} icon={<RiMessage2Line size={30} />} />
                    <ReviewItem label="Location" score={"4.0"} icon={<GrMapLocation size={30} />} />
                    <ReviewItem label="Value" score={"4.0"} icon={<FiTag size={30} />} />
                </div>
            </div>
            <ReviewInfo reviews={reviews} />
            <Review />
        </div>
    )
}
