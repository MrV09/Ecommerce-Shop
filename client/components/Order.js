import styled from "styled-components";

const StyledOrder = styled.div`
    background: rgb(255,255,255);
    background: linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(235,241,235,1) 49%, rgba(217,217,217,1) 100%);
    margin: 10px 0;
    padding: 10px 0;
    border-bottom: 2px solid #62EA2A;
`;

    const ProductInfo = styled.div`
        font-weight: bold;
        font-size: 1.1em;
    `;

export default function Order({line_items, createdAt}){
    return(
        <StyledOrder>
            <time>{(new Date(createdAt)).toLocaleString('en-GB')}</time>
            {line_items.map(item => (
                <ProductInfo>
                    {item.quantity} x {item.price_data.product_data.name}    
                </ProductInfo>
            ))}
        </StyledOrder>
    );
}