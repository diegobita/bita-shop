import { Slide } from "react-slideshow-image";
import 'react-slideshow-image/dist/styles.css';
import styles from "./SlideShowImages.module.css";

interface Props {
    images: string[],
    duration?: number,
}

export const SlideShowImages = (props: Props) =>{
    const {images, duration = 999999999} = props;
    return(
       <Slide
            easing="ease"
            duration={duration}
            indicators
       >
            {
                images.map(image => {
                    const url = `/products/${image}`;
                    return (
                        <div className={styles['each-slide']} key={image}>
                            <div style={{
                                backgroundImage: `url(${url})`,
                                backgroundSize: 'cover'
                            }}>

                            </div>
                        </div>
                    )
                })
            }
       </Slide>
    )
}