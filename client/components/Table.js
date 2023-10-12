import styled from "styled-components";

const StyledTable = styled.table`
    width: 100%;
    th{
        text-align: left;
        text-transform: uppercase;
        color: #24920B;
        font-size: 0.9rem;
    }
    td{
        border-top: 2px solid #ddd;
    }
`;

export default function Table(props){
    return <StyledTable {...props} />
}