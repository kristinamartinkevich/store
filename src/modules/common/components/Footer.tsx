import { Col, Row } from 'react-bootstrap';
import Icon from '@mdi/react';
import { mdiInstagram, mdiFacebook } from '@mdi/js';
import AppStores from '../../../assets/AppStore.svg';

const Footer = () => {
    return (
        <footer className="bg-light footer">
            <Row className="justify-content-between align-items-center p-4">
                <Col>
                    <h1>React</h1>
                </Col>
                <Col>
                    <div>Присоединяйтесь к нам</div>
                    <div className='d-flex justify-content-center'>
                        <Icon path={mdiInstagram} size={1} style={{ color: "#2967FF" }} />
                        <Icon path={mdiFacebook} size={1} style={{ color: "#2967FF" }} />
                    </div>
                </Col>
                <Col>
                    <div>Устанавливайте приложение</div>
                    <img src={AppStores} />
                </Col>
            </Row>
            <Row className="justify-content-center mb-3">
                <Col sm="auto">© Sionic </Col>
                <Col sm="auto">Правовая информация </Col>
                <Col sm="auto">Политика конфиденциальности </Col>
            </Row>
        </footer>
    )
}

export default Footer;
