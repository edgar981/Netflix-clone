import videoTestData from '../data/videos.json';
import {getWatchedVideos} from "@/lib/db/hasura";

const fetchVideos = async (url) => {
    const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
    const BASE_URL = "youtube.googleapis.com/youtube/v3";

    const response = await fetch(`https://${BASE_URL}/${url}&maxResults=25&key=${YOUTUBE_API_KEY}`)

    return  await response.json();

}

export async function getCommonVideos (url) {

    try {
        const isDev = process.env.DEVELOPMENT;
        const data = isDev ? videoTestData : await fetchVideos(url);
        if (data?.error) {
            console.log("Youtube API error", data.error);
            return [];
        }

        return data.items.map(item => {

            const id = item.id?.videoId || item.id;
            const snippet = item.snippet;

            return {
                title: snippet?.title,
                imgUrl: `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`,
                id,
                description: snippet?.description,
                publishTime: snippet?.publishedAt,
                channelTitle: snippet?.channelTitle,
                statistics: item.statistics ? item.statistics : {viewCount: 0},
            }
        });
    } catch (error) {
        console.log("Something went wrong with video library",error);
        return [];
    }
}

export function getVideos (searchQuery) {
    const URL = `search?part=snippet&q=${searchQuery}&type=video`;
    return getCommonVideos(URL);
}

export function getPopularVideos () {
    const URL = 'videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US&';
    return getCommonVideos(URL);
}

export function getYoutubeVideoById (videoId) {
    const URL = `videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}`;
    return getCommonVideos(URL);
}

export async function getWatchItAgainVideos (userId, token) {
    const videos = await getWatchedVideos(token, userId);
    return videos?.map(video => {
        return {
            id: video.videoId,
            imgUrl: `https://i.ytimg.com/vi/${video.videoId}/maxresdefault.jpg`
        }
    })
}

//Ks-_Mh1QhMc%2Cc0KYU2j0TM4%2CeIho2S0ZahI