import { Modal } from 'antd';
import React from 'react';

function ConfirmModal({ isOpen, onCancel, onConfirm, messageText }) {
    return (
        <Modal onCancel={onCancel} onOk={onConfirm} title="Confirm" open={isOpen}>
            <p>{messageText}</p>
        </Modal>
    );
}

export default ConfirmModal;