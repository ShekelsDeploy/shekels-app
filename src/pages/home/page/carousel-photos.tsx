import { Carousel } from "flowbite-react";
import img1 from 'assets/home/img1.jpg'
import img2 from 'assets/home/img2.jpg'
import img3 from 'assets/home/img3.jpg'
import img4 from 'assets/home/img4.jpg'
import React from "react";

export default function CarouselPhotos() {

    return (
        <>
            <div className="carousel-wrapper h-96 sm:h-64 xl:h-80 2xl:h-96 px-5">
                <Carousel>
                    <img
                        src={img1}
                        alt="..."
                    />
                    <img
                        src={img2}
                        alt="..."
                    />
                    <img
                        src={img3}
                        alt="..."
                    />
                    <img
                        src={img4}
                        alt="..."
                    />
                </Carousel>
            </div>
        </>
    )
}