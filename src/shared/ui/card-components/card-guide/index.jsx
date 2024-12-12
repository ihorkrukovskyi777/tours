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
    const [isPlaying, setIsPlaying] = useState(false);

    const videoRef = useRef(null);
    const playVideo = () => {
        videoRef.current.play();
        setIsPlaying(true);
    };
    const pauseVideo = () => {
        videoRef.current.pause();
        setIsPlaying(false);
    };
    console.log(videoURL , 'avatar');

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
                {videoURL.length > 0 &&
                    <div className="img_box">
                        <div>
                            {avatar && !isPlaying && <div className="custom_poster"><IcloudImage src={avatar} width={300} height={300} alt="icon"/></div>}
                            <Stream
                                streamRef={videoRef}
                                src={videoURL}
                            />
                            {!isPlaying ?
                                <button className="play" onClick={playVideo} type="button"><Image src={imagePlay} alt='icon'/></button> :
                                <button className="pause" onClick={pauseVideo} type="button"></button>
                            }
                        </div>
                    </div>
                }

                <div onClick={() => {
                    if (videoURL.length > 0) router.push(url?.toLowerCase())
                }}>
                    {!videoURL.length > 0 &&
                        <div className="img_box">
                            {avatar ? <IcloudImage src={avatar} width={270} height={270} alt="brand logo" /> : null }
                        </div>
                    }
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
