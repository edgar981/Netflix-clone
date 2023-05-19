import Card from "@/components/card/card";
import styles from "./section-card.module.css"
import Link from "next/link";
import cls from "classnames";

const SectionCards = (props) => {
    const {title, videos =  [], size, shouldWrap = false, shouldScale} = props;

    return <section className={styles.container}>
        <h2 className={styles.title}>{title}</h2>
        <div className={cls(styles.cardWrapper, shouldWrap && styles.wrap)}>
            {videos.map((video, idx) => {
                return (
                    // eslint-disable-next-line react/jsx-key
                    <Link href={`/video/${video.id}`} >
                        <Card id={idx} key={idx} imgUrl={video.imgUrl} size={size} shouldScale={shouldScale}/>
                    </Link>
                )
            })}
        </div>
    </section>

}

export default SectionCards;