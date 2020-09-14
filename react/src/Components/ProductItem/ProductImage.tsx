import React, {useState} from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import style from './ProductItem.module.css';

interface IProps {
    imgThumbnail: string
    openPopup: () => void
    imgUrl: string
    altText: string
    height?: number
}

const ProductImage = React.memo(({imgThumbnail, altText, imgUrl, openPopup, height = 310}: IProps) => {

    return (
        <div className={style.mainImgWrap} onClick={openPopup}>
            <LazyLoadImage
                alt={altText}
                height={height}
                src={imgUrl} // use normal <img> attributes as props
                effect="blur"
                placeholder={<span>afterLoad</span>}
                placeholderSrc={imgThumbnail}
                wrapperClassName={style.mainImg}
            />
        </div>
    );
});

export default ProductImage;
