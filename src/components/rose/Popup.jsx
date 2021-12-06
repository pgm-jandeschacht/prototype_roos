import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMeh, faSmile, faFrown, faTimesCircle } from '@fortawesome/free-regular-svg-icons'

const StyledPopup = styled.div`
    position: fixed;
    background: #00000040;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    transition: all 0.2s ease-in-out;
    visibility: ${props => props.visibility ? 'visible' : 'hidden'};
`

const Title = styled.p`
    font-family: Arial, Helvetica, sans-serif;
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0;
    margin-bottom: 1.5rem;
`

const Close = styled.button`
    cursor: pointer;
    background: none;
    border: none;
    position: absolute;
    padding: 0;
    right: -1.2rem;
    top: -1.2rem;
    background: #fff;
    border-radius: 100px;
    display: flex;
    transition: all 0.2s ease-in-out;
    
    svg {
        transition: all 0.2s ease-in-out;
        width: 3rem!important;
        height: 100%;
        color: red;
    }

    &:hover {
        background: red;

        svg {
            color: #fff;
        }
    }
`

const Container = styled.div`
    position: absolute;
    background: #fff;
    width: 15rem;
    border-radius: 17px;
    padding: 1.5rem;
    right: 2rem;
    bottom: 2rem;
`

const Flex = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    button {
        margin-right: 1rem;

        &:last-of-type {
            margin-right: 0;
        }
    }
`

const MoodSelector = styled.button`
    padding: 0;
    cursor: pointer;
    background: none;
    border: none;
    svg {
        transition: all 0.2s ease-in-out;
        width: 2.5rem!important;
        height: 100%;
    }

    &:hover {
        svg {
            color: ${props => props.moodColor}
        }
    }
`

const Popup = ({ name, open, onClose }) => {
    const [close, setClose] = useState(true);
    const handleClosing = () => {
        setClose(false);
    }

    useEffect(() => {
        onClose(close);
        setClose(true);
    }, [onClose, close]);

    return (
        <StyledPopup visibility={open}>
            <Container>
                <Title>{name}</Title>
                
                {/* Radio or Button*/}
                <Flex>
                    <MoodSelector moodColor={"green"}><FontAwesomeIcon icon={faSmile}/></MoodSelector>

                    <MoodSelector moodColor={"orange"}><FontAwesomeIcon icon={faMeh}/></MoodSelector>

                    <MoodSelector moodColor={"red"}><FontAwesomeIcon icon={faFrown}/></MoodSelector>
                </Flex>

                <Close onClick={handleClosing}><FontAwesomeIcon icon={faTimesCircle}/></Close>
            </Container>

        </StyledPopup>
    )
}

export default Popup
