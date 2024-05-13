import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Icon from '@mdi/react';
import { mdiMapMarkerOutline, mdiCartOutline, mdiAccount } from '@mdi/js';
import { Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function NavBar() {
    const navigate = useNavigate();
    const cartItemsCount = useSelector(state => state.products).length

    function handleClickCart() {
        navigate("/order");
    }

    function handleClickHome() {
        navigate("/");
    }
    return (
        <Navbar bg="light" expand="lg" className='mb-5'>
            <Container>
                <Navbar.Brand onClick={handleClickHome}><h2>React</h2></Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse>
                    <Nav className='d-flex align-items-center'>
                        <Nav.Link>
                            <Icon path={mdiMapMarkerOutline} size={1} />
                            Александровск-Са...
                        </Nav.Link>
                        <Nav.Link onClick={handleClickCart}>
                            <div className='rounded-circle p-3 border mx-2'>
                                <Icon path={mdiCartOutline} size={1} />
                                <Badge bg="secondary">{cartItemsCount}</Badge>
                            </div>
                        </Nav.Link>
                        <div className='rounded-circle p-3 border' >
                            <Icon path={mdiAccount} size={1} />
                        </div>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    );
}

export default NavBar;