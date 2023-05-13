import { useEffect, memo } from "react";
import { createPortal } from 'react-dom';
import {Overlay, ModalContainer } from './Modal.styled';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

function Modal ({onCloseModal, url, alt}) {

    useEffect(() => {
            window.addEventListener('keydown', handleKeydown);
        return () => {
            window.removeEventListener('keydown', handleKeydown)
        }
    })

    const handleKeydown = e => {
        if (e.code === 'Escape') {
            onCloseModal()
        };
    };

    const clickOnBackdrop = e => {
        if (e.target === e.currentTarget) {
            onCloseModal();
        };
    };

        return createPortal(
            <Overlay onClick={clickOnBackdrop}>
                <ModalContainer>
                    <img src={url} alt={alt} />
                </ModalContainer>
            </Overlay>,
            modalRoot
        )
};

export default memo(Modal);

Modal.propTypes = {
            onCloseModal: PropTypes.func.isRequired,
            alt: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
};
