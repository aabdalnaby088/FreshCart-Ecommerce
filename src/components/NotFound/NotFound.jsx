import React from 'react'
import notFound from '../../images/error.svg'
import styles from './NotFound.module.css';
export default function NotFound() {
    return (
        <section className={`d-flex align-items-center justify-content-center ${styles.NotFoundPage}`}>
            <div className='NotFoundImg '>
                <img src={notFound} alt="NotFound Img" />
            </div>
        </section>
    )
}
