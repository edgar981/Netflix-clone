import Card from "@/components/card/card";
import styles from "./section-card.module.css"

const SectionCards = (props) => {
    const {title, videos, size} = props;

    return <section className={styles.container}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.cardWrapper}>
            {videos.map((video, idx) => {
                return <Card id={idx} key={idx} imgUrl={video.imgUrl} size={size}/>
            })}
        </div>
    </section>

}

export default SectionCards;