'use client'
import {useRouter} from "next/navigation";
import IcloudImage from '../../icloud-image';
import FlagsComponents from "@/shared/ui/flags";
import imagePlay from '@/assets/images/svg/play.svg';
import styles from './style.module.css'
import {useRef, useState} from "react";
import { Stream } from "@cloudflare/stream-react";
import Image from "next/image";

export default function CardGuide({children , avatar , url , bottomView = [] , videoURL = ''}) {
    const router = useRouter();

    const [isPlay, setIsPlay] = useState(false);

    const videoRef = useRef(null);
    const playVideo = () => {
        videoRef.current.play();
    };
    const pauseVideo = () => {
        videoRef.current.pause();
    };
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
                    <div>

                        <Stream
                            streamRef={videoRef}
                            src={videoURL}
                        />
                        <button onClick={playVideo} type="button">
                            Watch
                        </button>
                        <button onClick={pauseVideo} type="button">
                            pause
                        </button>


                    </div>
                }
            </div>

                <div onClick={() => {
                    if (videoURL.length > 0) router.push(url?.toLowerCase())
                }}>
                    {children}
                    <div className='flags_wrap'>
                        {bottomView.map((item, index) => (
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
