// System Components import
import React from "react"

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const useImageLoader = (images: string[]) => {
    const [loadedImage, setLoadedImage] = React.useState<boolean>(false);
    const [progress, setProgress] = React.useState(0);

    React.useEffect(() => {
        let countLoaded = 0;
        const totalimages = images.length;

        const promise = images.map((image) => {
            return new Promise<void>((resolve) => {
                const img = new Image();
                img.src = image;

                img.onload = async () => {
                    countLoaded++;
                    setProgress(countLoaded / totalimages);
                    await delay(200);
                    resolve();
                    console.log(progress);
                }

                img.onerror = async (error) => {
                    console.error(`Error Loading Image: ${image}. Error is - ${error}`);
                    countLoaded++;
                    setProgress(countLoaded / totalimages);
                    await delay(200);
                    resolve();
                }
            });
        });

        Promise.all(promise).then(() => {
            setLoadedImage(true);
        });

    }, [images, progress]);

    return { loadedImage, progress }
}