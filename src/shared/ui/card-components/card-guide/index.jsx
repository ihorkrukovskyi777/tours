'use client'
import {useRouter} from "next/navigation";
import IcloudImage from '../../icloud-image';
import FlagsComponents from "@/shared/ui/flags";
import imagePlay from '@/assets/images/svg/play.svg';
import styles from './style.module.css'
import {useRef, useState} from "react";
import Image from "next/image";
export default function CardGuide({children , avatar , url , bottomView = [] , videoURL = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4'}) {
    const router = useRouter();

    const videoRef = useRef(null);
    const  [statusPlay , setStatusPlay] = useState(false);

    const handlePlay = () => {
        videoRef.current.play();
        setStatusPlay(true);
    };

    const handlePause = () => {
        videoRef.current.pause();
        setStatusPlay(false);
    };

    console.log(statusPlay);

    return (


        <div
            onClick={() => {
                if (!videoURL.length > 0) {
                    router.push(url?.toLowerCase())
                }
            }}
            className={styles.item}
        >
            <div className={styles.text_wrapper}>

            <div className="img_box">
                {videoURL &&
                    <div className="video_block">
                        <video
                            ref={videoRef}
                            controls={false}
                        >
                            <source src={videoURL} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                        {!statusPlay &&
                            <button onClick={handlePlay} className="play">
                                <Image
                                    src={imagePlay}
                                    alt="play"
                                    width={48}
                                    height={48}
                                    style={{ fill: "red" }}
                                />
                            </button>
                        }
                        {statusPlay && <button onClick={handlePause} className="pause"></button> }
                    </div>
                }
            </div>

                <div onClick={() => {if(videoURL.length > 0) router.push(url?.toLowerCase())}}>
                    {children}
                    <div className='flags_wrap'>
                        {bottomView.map((item , index) => (
                            <div key={index} className='flag'>
                                <FlagsComponents locale={item} alt={`flag`}  className='country-box-select'/>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
