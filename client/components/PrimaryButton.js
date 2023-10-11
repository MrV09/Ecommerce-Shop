import styled from "styled-components";
import css from "styled-jsx/css";

export const ButtonStyle = css`
    background-color: transparent;
    border: 1px solid #fff;
    color: #fff;
    font-weight: 700;
    padding: 10px 20px;
    border-radius: 10px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    text-decoration: none;
    svg{
        height: 16px;
        margin-right: 5px;
    }
    font-size: 1rem;
    ${props => props.size === 'l' && css`
        background: rgb(142,255,135);
        background: linear-gradient(90deg, rgba(142,255,135,1) 0%, rgba(30,175,26,1) 38%, rgba(8,190,50,1) 100%);
        padding: 15px 30px;
        svg{
            height: 20px;
        }
    `}
`;

const StyledButton = styled.button`
    ${ButtonStyle}
`;

export default function PrimaryButton({children,...rest}){
    return(
        <StyledButton {...rest}>{children}</StyledButton>
    );
}