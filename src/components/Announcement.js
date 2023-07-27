import styled from 'styled-components';

const Container = styled.div`
	height: 30px;
	background-color: SteelBlue;
	color: white;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 14px;
	font-weight: 500;
`;

const Announcement = () => {
	return <Container>Guess What!! Free Shipping on Orders Over 80$</Container>;
};

export default Announcement;
