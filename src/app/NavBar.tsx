"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";

export default function NavBar(){
    const pathname = usePathname();
    

    function onSelect(eventKey: string | null ){
        console.log(eventKey)
    }

    return (
        <Navbar bg="success" variant="dark" sticky="top" expand="sm" collapseOnSelect onSelect={onSelect}>
            <Container>
                <Navbar.Brand as={Link} href="/">
                    Nextjs Gallery
                </Navbar.Brand>
                    <Navbar.Toggle aria-controls="main-navbar"/>
                    <Navbar.Collapse id='main-navbar'>
                        <Nav>
                            <Nav.Link as={Link} href='/static' active={pathname === '/static'}>Static</Nav.Link>
                            <Nav.Link as={Link} href='/dynamic' active={pathname === '/dynamic'}>Dynamic</Nav.Link>
                            <Nav.Link as={Link} href='/isr' active={pathname === '/isr'}>Isr</Nav.Link>
                            <NavDropdown title="Topics" id="topics-dropdown">
                                <NavDropdown.Item as={Link} href="/topics/toaster">toaster</NavDropdown.Item>
                                <NavDropdown.Item as={Link} href="/topics/bush">bush</NavDropdown.Item>
                                <NavDropdown.Item as={Link} href="/topics/office">office</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link as={Link} href='/search' active={pathname === '/search'}>Search</Nav.Link>
                        </Nav>
                </Navbar.Collapse>
            </Container>
    </Navbar>
    )
}