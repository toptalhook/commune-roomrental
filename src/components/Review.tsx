/*
*/
'use cient';

import Image from "next/image";

import { Rate } from "antd";
import { Input } from 'antd';
import { useState, useRef } from "react";
import { TextAreaRef } from "antd/es/input/TextArea";

import { createReview } from '@/services/review';

const { TextArea } = Input;

interface ReviewProps {
    closeModal: () => void,
    listingId: string
}

const Review: React.FC<ReviewProps> = ({
    closeModal,
    listingId
}) => {
    const description = useRef<TextAreaRef>(null);
    const [cleanliness, setCleanliness] = useState(3);
    const [accuracy, setAccuracy] = useState(3);
    const [check_in, setCheck_in] = useState(3);
    const [communication, setCommunication] = useState(3);
    const [location_score, setLocation_score] = useState(3);
    const [value, setValue] = useState(3);

    const setRating = (value: number, key: string) => {
        switch (key) {
            case "cleanliness":
                setCleanliness(value);
                break;
            case "accuracy":
                setAccuracy(value);
                break;
            case "check_in":
                setCheck_in(value);
                break;
            case "communication":
                setCommunication(value);
                break;
            case "location_score":
                setLocation_score(value);
                break;
            case "value":
                setValue(value);
                break;
        }
    }

    const submit = async () => {
        const data = {
            cleanliness: cleanliness,
            accuracy: accuracy,
            check_in: check_in,
            communication: communication,
            location_score: location_score,
            value: value,
            description: description?.current?.resizableTextArea?.textArea.value || '',
            listingId: listingId
        }
        const review = await createReview(data);
        closeModal()
    }
    return (
        <div className="fixed z-50 inset-0 bg-gray-900 bg-opacity-60 overflow-hidden h-full w-full px-4 ">
            <div className="relative top-40 mx-auto shadow-xl rounded-md bg-white w-[60vw] h-[70vh]">
                <div className="  px-5 py-2">
                    <button type="button"
                        onClick={closeModal}
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clip-rule="evenodd"></path>
                        </svg>
                    </button>
                </div>
                <div className="flex items-center justify-center">
                    <Image src={"https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-GuestFavorite/original/78b7687c-5acf-4ef8-a5ea-eda732ae3b2f.png"} alt={""} width={60} height={100} />
                    <h1 className=" text-6xl font-bold py-10 mb-5 font-Circular" >Your Review</h1>
                    <Image src={"   https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-GuestFavorite/original/b4005b30-79ff-4287-860c-67829ecd7412.png"} alt={""} width={60} height={100} />
                </div>
                <hr className="w-[80%] justify-center mx-auto mb-10" />
                <div className="grid grid-cols-8">
                    <div className="col-span-3 ">
                        <div className="px-10 ">
                            <div className=" ">
                                <h1>Cleanliness</h1>
                                <Rate
                                    defaultValue={3}
                                    style={{ fontSize: '200%' }}
                                    value={cleanliness}
                                    onChange={(value) => setRating(value, "cleanliness")}
                                />
                            </div>
                            <div>
                                <h1>Accuracy</h1>
                                <Rate
                                    defaultValue={3}
                                    style={{ fontSize: '200%' }}
                                    value={accuracy}
                                    onChange={(value) => setRating(value, "accuracy")}
                                />
                            </div>
                            <div>
                                <h1> Check-in</h1>
                                <Rate
                                    defaultValue={3}
                                    style={{ fontSize: '200%' }}
                                    value={check_in}
                                    onChange={(value) => setRating(value, "check_in")}
                                />
                            </div>
                            <div>

                                <h1>Communication</h1>
                                <Rate
                                    defaultValue={3}
                                    style={{ fontSize: '200%' }}
                                    value={communication}
                                    onChange={(value) => setRating(value, "communication")}
                                />
                            </div>

                            <div>

                                <h1>Location</h1>
                                <Rate
                                    defaultValue={3}
                                    style={{ fontSize: '200%' }}
                                    value={location_score}
                                    onChange={(value) => setRating(value, "location_score")}
                                />
                            </div>

                            <div>

                                <h1>  Value</h1>
                                <Rate
                                    defaultValue={3}
                                    style={{ fontSize: '200%' }}
                                    value={value}
                                    onChange={(value) => setRating(value, "value")}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-span-5 pr-10">
                        <div className="flex items-center">
                            <TextArea
                                ref={description}
                                placeholder="write your review kindly"
                                style={{ height: 300, fontSize: 30 }}
                            />

                        </div>


                    </div>

                </div>
                <div className="flex items-center justify-center">
                    <button
                        onClick={submit}
                        className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 border border-blue-700 rounded text-3xl items-center">
                        Submit
                    </button>
                </div>
            </div>
        </div>

    );
}

export default Review;