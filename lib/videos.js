import videoData from '../data/videos.json';

export async function getCommonVideos (url) {
    const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

    try {
        const BASE_URL = "youtube.googleapis.com/youtube/v3";

        const response = await fetch(`https://${BASE_URL}/${url}&maxResults=25&key=${YOUTUBE_API_KEY}`)

        const data = await response.json();

        if (data?.error) {
            console.log("Youtube API error", data.error);
            return [];
        }

        return data.items.map(item => {

            const id = item.id?.videoId || item.id;
            const snippet = item.snippet;

            return {
                title: snippet?.title,
                imgUrl: snippet?.thumbnails.high.url,
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

//Ks-_Mh1QhMc%2Cc0KYU2j0TM4%2CeIho2S0ZahI