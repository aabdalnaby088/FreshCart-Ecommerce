import React, { useEffect, useState } from 'react'
import { Modal } from 'bootstrap';
export default function ModalComp({ status, setStatus , logOut }) {

    const[memo , setMemo] = useState(false); 
    useEffect(() => {
        let modal = new Modal(document.getElementById('staticBackdrop'))
        if (status == true) {
            modal.show();
        } else {
            modal.hide()
        }

    }, [status]);


    function closeModal(){
        setStatus(false);
    }
    return (

        // <div className="Modal_container d-flex justify-content-center align-items-center">
        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="staticBackdropLabel">Logout</h1>
                        <button type="button" onClick={closeModal} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        Are you sure you want to log out?
                    </div>
                    <div className="modal-footer">
                        <button onClick={closeModal} type="button" className="btn btn-success" data-bs-dismiss="modal">Stay With us 🤗</button>
                        <button type="button" onClick={logOut} className="btn btn-danger">Logout 🥺</button>
                    </div>
                </div>
            </div>
        </div>
        // </div>

    )
}
