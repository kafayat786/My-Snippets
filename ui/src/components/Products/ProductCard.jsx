import React from 'react';
import { Card, ProgressBar } from 'react-bootstrap';
import './card.scss';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
    const navigate = useNavigate();
    return (
        <>
            <Card className="product-card my-2" onClick={() => navigate(`/product/${product.id}`)}>
                <Card.Img
                    variant="top"
                    src={product.img}
                    style={{
                        height: '226px'
                    }}
                />
                <Card.Body>
                    <Card.Title className="title">{product.title}</Card.Title>
                    <h3>{product.price}</h3>
                    <Card.Text className="desc">{product.description}</Card.Text>
                    <div className="catogory-box">{product.category}</div>
                    {product.type === 'target' && (
                        <p className="mb-3 goal">
                            <span className="percentage"> 93% </span> of target/goal has completed in this campaign.
                        </p>
                    )}
                    {product.type === 'fixed' && (
                        <>
                            <ProgressBar className="bar" now={90} />
                            <div className="d-flex align-items-center justify-content-between my-2 mb-4 target">
                                <p>
                                    <span> Raised:</span> $8500
                                </p>
                                <p className="text-end">
                                    <span> Goal:</span> $1,0000
                                </p>
                            </div>
                        </>
                    )}
                    {product.type === 'ongoing' && (
                        <div className="ongoing">
                            <span className=" ">Campaign is on-going...</span>
                        </div>
                    )}
                </Card.Body>
            </Card>
        </>
    );
};

export default ProductCard;
