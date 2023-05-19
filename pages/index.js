import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Banner from "@/components/banner/banner";
import NavBar from "@/components/nav/navBar";
import Card from "@/components/card/card";
import SectionCards from "@/components/card/section-cards";
import {getPopularVideos, getVideos, getWatchItAgainVideos} from "@/lib/videos";
import {verifyToken} from "@/lib/utils";
import useRedirectUser from "@/utils/redirectUser";


const inter = Inter({ subsets: ['latin'] })

export async function getServerSideProps (context){
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {userId, token} = await useRedirectUser(context);

    if (!userId){
        return {
            props: {},
            redirect: {
                destination: '/login',
                permanent: false,
            }
        }
    }

    const pelisVideos = await getVideos('Hollywood%20animation%20movies');
    const productivityVideos = await getVideos('Productivity');
    const travelVideos = await getVideos('Travel');
    const popularVideos = await getPopularVideos();
    const watchItAgainVideos = await getWatchItAgainVideos(userId, token);

    return {props: {pelisVideos, productivityVideos, travelVideos, popularVideos, watchItAgainVideos}}
}

export default function Home({pelisVideos, productivityVideos, travelVideos, popularVideos, watchItAgainVideos=[]}) {

  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <NavBar />
      <Banner videoId='UTAvGzCK6ok' title='Up' subTitle='adventure' imgUrl='/static/upMovie.webp'/>

      <div className={styles.sectionWrapper}>
          <SectionCards title={'Pelis'} videos={pelisVideos} size={'large'}/>
          <SectionCards title={'Watch again'} videos={watchItAgainVideos} size={'small'}/>
          <SectionCards title={'Travel'} videos={travelVideos} size={'small'}/>
          <SectionCards title={'Productivity'} videos={productivityVideos} size={'medium'}/>
          <SectionCards title={'Popular'} videos={popularVideos} size={'small'}/>
      </div>

    </div>
  )
}
