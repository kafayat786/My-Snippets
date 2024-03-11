import React from 'react';
import { Card, Col, Container, ProgressBar, Row } from 'react-bootstrap';
import campaigndetail from '@images/campaigndetailimg.png';
import SimilarProducts from '@components/Products/SimilarProducts';
import person from '@icons/person.png';

import { ProductsData } from '../Data/data';

import './campaigns.scss';

const CampaignDetail = () => {
    return (
        <div className="campign-detail-container">
            <Container>
                <h4 className="camp-heading-text">Medical Campaign</h4>
                <Row>
                    <Col xl={8} lg={6} sm={12} className="container-spacing">
                        <div className="detail-img">
                            <img src={campaigndetail} alt="detail-img" />
                        </div>
                        <div className="d-flex align-items-center justify-content-between">
                            <div>
                                <span className="me-2 mt-1">
                                    <img src={person} width="35" style={{ marginBottom: '-9px' }} />
                                </span>
                                <span className="org-name">Kathrine Langford is organizing this fundraiser.</span>
                                <p className="org-location">Location: Kathrine Langford is organizing this fundraiser.</p>
                            </div>
                            <div className="date-published">
                                <span>5 Days Ago</span>
                            </div>
                        </div>
                        <hr />
                        <div>
                            <p className="org-name">Unser Sohn verlor einen seiner besten Freunde und wir wollen helfen.</p>
                            <br />
                            <p className="org-name">
                                Nachdem in Ladenburg die 47-jährige Mutter und ihr 22-jähriger Sohn bei einem Feuer im Dachgeschoss starben, gilt unser tiefes Mitgefühl der überlebenden Anna, 9 Jahre.
                                Anna hat alles im Brand verloren. Die Liebe ihrer Mutter und ihres geliebten Halbbruders David können wir ihr nicht ersetzen. Erinnerungen wie Fotos, Kleidung oder
                                Möbel sind alle zerstört.
                            </p>
                            <br />
                            <p className="org-name">
                                Nachdem in Ladenburg die 47-jährige Mutter und ihr 22-jähriger Sohn bei einem Feuer im Dachgeschoss starben, gilt unser tiefes Mitgefühl der überlebenden Anna, 9 Jahre.
                                Anna hat alles im Brand verloren. Die Liebe ihrer Mutter und ihres geliebten Halbbruders David können wir ihr nicht ersetzen. Erinnerungen wie Fotos, Kleidung oder
                                Möbel sind alle zerstört.
                            </p>
                            <br />
                            <p className="org-name"> Wir möchten ihr gemeinsam helfen, die Dinge anzuschaffen, die ein Kind und später ein Teenager auf dem Weg zum Erwachsenwerden benötigt.</p>
                            <p className="org-name">
                                Der erste Teil der Spenden (ca. € 5.000) wird dringend für eine Grabstätte für die Brandopfer benötigt. Anna muss einen Ort der Trauer zur Trauerbewältigung bekommen.
                            </p>
                            <br />
                            <p className="org-name">
                                Wir setzen auf Hilfe von Ladenburgern für eine kleine Ladenburgerin und freuen uns umso mehr auf Leute von außerhalb, die ebenfalls für Anna spenden möchten! Auf ein
                                Foto von Anna haben wir bewusst verzichtet und bitten um Verständnis.
                            </p>
                        </div>
                    </Col>
                    <Col lg={6} xl={4} sm={12}>
                        <Card className=" camp-detail-card">
                            <div className="d-flex align-items-center justify-content-between">
                                <h5 className="camp-heading-text">Fund Collected</h5>
                                <h5>85%</h5>
                            </div>
                            <ProgressBar now={85} className="mb-2" />
                            <div className="d-flex align-items-center justify-content-between mb-3">
                                <p>
                                    Raised:<span>500$</span>
                                </p>
                                <p>
                                    Goal:<span>8000$</span>
                                </p>
                            </div>
                            <p className="mb-3 charity-desc">
                                Join our charity campaign and be a force for good! Together, we're making a positive impact by providing essential resources, empowering communities, and fostering
                                hope. Your support, no matter the size, contributes to transforming lives and building a more compassionate world. Let's unite for this common cause and create a ripple
                                effect of kindness and generosity. Every donation matters, and together, we can make a meaningful difference.
                            </p>
                            <div className="d-flex align-items-center justify-content-between btn-camp">
                                <button type="button">Browse Listings</button>
                                <button type="button">Share</button>
                            </div>
                        </Card>
                    </Col>
                </Row>
                <hr />
                <SimilarProducts products={ProductsData} title={'Products Assigned with Medical Campaign'} />
            </Container>
        </div>
    );
};

export default CampaignDetail;
