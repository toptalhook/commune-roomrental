/*
*/

import { Rate } from "antd";

const Review = () => {
    return (
        <div className="fixed z-50 inset-0 bg-gray-900 bg-opacity-60 overflow-hidden h-full w-full px-4 ">
            <div className="relative top-40 mx-auto shadow-xl rounded-md bg-white w-[60vw] h-[70vh]">
                <div className="grid grid-cols-8">
                    <div className="col-span-3 ">
                        <div>
                            Clieanliness
                            <Rate defaultValue={3} ></Rate>
                        </div>
                        <div>
                            <Rate defaultValue={3}></Rate>
                        </div>

                    </div>
                    <div className="col-span-5 ">

                    </div>
                </div>
            </div>
        </div>

    );
}

export default Review;