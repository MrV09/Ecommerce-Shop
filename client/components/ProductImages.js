import { useState } from "react";
import styled, {css} from "styled-components"

const Image = styled.img`
    max-width: 100%;
    max-height: 100%;
`;

const ImageButtons = styled.div`
display: flex;
gap: 10px;
margin-top: 10px;
`;

const Button = styled.div`
    border: 2px solid #aaa;
    ${props => props.active ? `
        border-color: #48FC43;
    ` : `
        border-color: transparent;
    `}
    background-color: #ccc;
    border-radius: 5px;
    height: 100px;
    padding: 5px;
    cursor: pointer;
`;

const ImageWrapper = styled.div`
    text-align: center;
`;

export default function ProductImages({images}){

    const [activeImage, setActiveImage] = useState(images?.[0]);

    return (
        <>
            <ImageWrapper>
                <Image src={activeImage}/>
            </ImageWrapper>  
            <ImageButtons>
                {images.map(image => (
                    <Button key={image} active={image === activeImage} onClick={() => setActiveImage(image)}>
                        <Image src={image} alt=""/>
                    </Button>
                ))}
            </ImageButtons>
        </>
    )
}