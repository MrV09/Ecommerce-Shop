import styled, {css} from "styled-components";

const Box = styled.div`
    background: rgb(255,255,255);
    background: linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(235,241,235,1) 49%, rgba(217,217,217,1) 100%);
    border-radius: 10px;
    padding: 30px;
    ${props => props.type === 'confirmation' && css`
        text-align: center;
    `}
`;

export default Box;