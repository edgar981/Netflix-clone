import {useRouter} from "next/router";
import Modal from 'react-modal';
import styles from '../../styles/video.module.css';
import cls from "classnames";

Modal.setAppElement('#__next');

const Video = () => {
    const router = useRouter();

    const video = {
        title: 'Hi everybody on valley',
        publishTime: '1990-01-01',
        description: 'description hehe',
        channelTitle: 'Family Central',
        viewCount: 1000000,
    }

    const {title, publishTime, channelTitle, description, viewCount} = video;

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