import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Icon from '@mdi/react';
import { mdiMapMarkerOutline, mdiMagnify, mdiCartOutline, mdiAccount } from '@mdi/js';
import { Badge, Form, InputGroup } from 'react-bootstrap';


function NavBar() {
    return (
        <Navbar bg="light" expand="lg" className='mb-5'>
            <Container>
                <Navbar.Brand><h2>React</h2></Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse>
                    <Nav className='d-flex align-items-center'>
                        <Nav.Link>
                            <Icon path={mdiMapMarkerOutline} size={1} />
                            Александровск-Са...
                        </Nav.Link>

                        <Form.Group>
                            <InputGroup>
                                <Form.Control
                                    placeholder=" Поиск бренда, товара, категории..."
                                />
                                <InputGroup.Text><Icon path={mdiMagnify} size={1} /></InputGroup.Text>
                            </InputGroup>
                        </Form.Group>
                        <div className='rounded-circle p-3 border mx-2'>
                            <Icon path={mdiCartOutline} size={1} />
                            <Badge bg="secondary">9</Badge>
                        </div>
                        <div className='rounded-circle p-3 border'>
                            <Icon path={mdiAccount} size={1} />
                        </div>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    );
}

export default NavBar;