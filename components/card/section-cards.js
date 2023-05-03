import Card from "@/components/card/card";
import styles from "./section-card.module.css"
import Link from "next/link";

const SectionCards = (props) => {
    const {title, videos =  [], size} = props;

    return <section className={styles.container}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.cardWrapper}>
            {videos.map((video, idx) => {
                console.log({video})
                return (
                    <Link href={`/video/${video.id}`} >
                        <Card id={idx} key={idx} imgUrl={video.imgUrl} size={size}/>
                    </Link>
                )
            })}
        </div>
    </section>

}

export default SectionCards;