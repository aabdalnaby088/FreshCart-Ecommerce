import React from 'react';
import styles from './ItemHolder.module.css';

export default function ItemHolder({ items, layer, height }) {
    return (
        <>
            <div className="row g-4 my-5">
                {items?.map((item) => {
                    return (
                        <div key={item._id} className="col-lg-3 col-md-6 ">
                            <div className={`position-relative ${styles.item}`}>
                                <img src={item.image} className="w-100" alt="" height={height} />
                                <div className={layer ? layer : styles.layer}>
                                    <h3 className='text-center'>{item.name}</h3>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
}
