import {useRouter} from "next/router";
import Modal from 'react-modal';
import styles from '../../styles/video.module.css';
import cls from "classnames";
import {getYoutubeVideoById} from "@/lib/videos";

Modal.setAppElement('#__next');

export async function getStaticProps(context) {
    // const video = {
    //     title: 'Hi everybody on valley',
    //     publishTime: '2023-01-01',
    //     description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s,' +
    //         ' when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, ' +
    //         'when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ',
    //     channelTitle: 'Family Central',
    //     viewCount: 1000000,
    // }
    const videoId = context.params.videoId;
    const videoArray = await getYoutubeVideoById(videoId);

    return {
        props: {
            video: videoArray.length > 0 ? videoArray[0] : {},
        },
        revalidate: 10,
    }
}

export async function getStaticPaths() {
    const listOfVideos = ["mYfJxlgR2jw", "4zH5iYM4wJo", "KCPEHsAViiQ"];

    const paths = listOfVideos.map((videoId) => ({
        params: { videoId },
    }))

    return { paths, fallback: 'blocking' }
}

const Video = ({video}) => {
    const router = useRouter();

    const {title, publishTime, channelTitle, description, statistics: {viewCount}} = video;

    return <div className={styles.container}>
        <Modal
            isOpen={true}
            contentLabel="Video Modal"
            onRequestClose={() => router.back()}
            className={styles.modal}
            overlayClassName={styles.overlay}
        >
            <iframe id={'ytplayer'} type={'text/html'} width={'100%'} className={styles.videoPlayer}
                    height={'360'} src={`https://www.youtube.com/embed/${router.query.videoId}?autoplay=0&origin=http://example.com&controls=0&rel=1`}
                    frameBorder={'0'}></iframe>

            <div className={styles.modalBody}>
                <div className={styles.modalBodyContent}>
                    <div className={styles.col1}>
                        <p className={styles.publishTime}>{publishTime}</p>
                        <p className={styles.title}>{title}</p>
                        <p className={styles.description}>{description}</p>
                    </div>
                    <div className={styles.col2}>
                        <p className={cls(styles.subText, styles.subTextWrapper)}>
                            <span className={styles.textColor}>Cast: </span>
                            <span className={styles.channelTitle}>{channelTitle}</span>
                        </p>
                        <p className={cls(styles.subText, styles.subTextWrapper)}>
                            <span className={styles.textColor}>View Count: </span>
                            <span className={styles.channelTitle}>{viewCount}</span>
                        </p>
                    </div>
                </div>
            </div>

        </Modal>
    </div>
}

export default Video;