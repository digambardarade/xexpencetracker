//
import "./Modal.css";
import ModalForm from '../ModalForm/ModalForm';
import PropTypes from 'prop-types';

const Modal = ({ toggleModal, text, existingData }) => {
    return (
        <div className='Modal' onClick={toggleModal} role="dialog" aria-modal="true">
            <div className='modalBody' onClick={e => e.stopPropagation()}>
                <div className='modalHead'>{text}</div>
                <ModalForm existingData={existingData} formType={text} toggleModal={toggleModal}/>
            </div>
        </div>
    );
};

Modal.propTypes = {
    toggleModal: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
    existingData: PropTypes.object
};

export default Modal;