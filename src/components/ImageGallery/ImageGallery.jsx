import ImageGalleryItem from "components/ImageGalleryItem";
import { GalleryContainer } from './ImageGallery.styled';
import PropTypes from 'prop-types';

export default function ImageGallery({images}) {
    return (
        <GalleryContainer>
            {images.map(({ id, webformatURL, tags, largeImageURL }) => (
                <ImageGalleryItem
                    largeImageURL={largeImageURL}
                    tags={tags}
                    key={id}
                    image={webformatURL} />
            ))}
        </GalleryContainer>
    );
};

ImageGallery.propTypes = {
    images: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            webformatURL: PropTypes.string.isRequired,
            tags: PropTypes.string,
            largeImageURL: PropTypes.string.isRequired,
        })
    )
};
