import { useState } from "react";
import Modal from "components/Modal";
import PropTypes from 'prop-types';
import { GalleryItem, GalleryImage } from './ImageGalleryItem.styled';

export default function ImageGalleryItem({ largeImageURL, tags, image}) {
    const [showModal, setShowModal] = useState(false);

    const onToggleModal = () => {
        setShowModal(!showModal)
    };

        return (
            <>
                <GalleryItem>
                    <GalleryImage
                        onClick={onToggleModal}
                        src={image}
                        alt={tags} />
                </GalleryItem>

                {showModal && <Modal
                    onCloseModal={onToggleModal}
                    url={largeImageURL}
                    alt={tags}
                />}
            </>
        );
};

ImageGalleryItem.propTypes = {
            image: PropTypes.string.isRequired,
            tags: PropTypes.string.isRequired,
            largeImageURL: PropTypes.string.isRequired,
};

