import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMeh, faSmile, faFrown, faTimesCircle } from '@fortawesome/free-regular-svg-icons'

interface PopupProps {
    name: string,
    open: boolean,
    onClose: (close: boolean) => void
}

interface StyledPopupProps {
    isVisible: boolean
}

const StyledPopup = styled.div<StyledPopupProps>`
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    transition: all 0.2s ease-in-out;
    visibility: ${(StyledPopupProps) => StyledPopupProps.isVisible ? 'visible' : 'hidden'};
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
    z-index: 2;
    position: absolute;
    background: #fff;
    width: 15rem;
    border-radius: 17px;
    padding: 1.5rem;
    right: 2rem;
    bottom: 2rem;
    box-shadow: 0 1px 4px #00000020;
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

interface MoodSelectorProps {
    moodColor: string,
    buttonColor: string
}

const MoodSelector = styled.button<MoodSelectorProps>`
    padding: 0;
    cursor: pointer;
    background: none;
    border: none;
    display: flex;
    svg {
        transition: all 0.2s ease-in-out;
        width: 2.5rem!important;
        height: 100%;
        color: ${(MoodSelectorProps) => (MoodSelectorProps.moodColor === MoodSelectorProps.buttonColor && MoodSelectorProps.buttonColor !== undefined ? MoodSelectorProps.buttonColor : 'black')};
    }

    &:hover {
        svg {
            color: ${(MoodSelectorProps) => MoodSelectorProps.moodColor}
        }
    }
`

const StyledBackground = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    cursor: pointer;
    background: #00000040;
`

const Popup: React.FC<PopupProps> = ({ name, open, onClose }) => {
    const [close, setClose] = useState(true);
    const [buttons, setButtons] = useState({ 'id': '' })

    const handleClosing = () => {
        setClose(false);
        setButtons({'id': ''})
    }

    useEffect(() => {
        onClose(close);
        setClose(true);
    }, [onClose, close]);

    const handleMood = (e: React.MouseEvent<HTMLButtonElement>) => {
        const event: any = e.target;
        setButtons({'id': (event.id || event.parentNode.id)})
    }

    return (
        <StyledPopup isVisible={open}>
        <Container>
            <Title>{name}</Title>
            
            <Flex>
                <MoodSelector onClick={handleMood} buttonColor={buttons.id} moodColor={"green"}><FontAwesomeIcon id="green" icon={faSmile}/></MoodSelector>

                <MoodSelector onClick={handleMood} buttonColor={buttons.id} moodColor={"orange"}><FontAwesomeIcon id="orange" icon={faMeh}/></MoodSelector>

                <MoodSelector onClick={handleMood} buttonColor={buttons.id} moodColor={"red"}><FontAwesomeIcon id="red" icon={faFrown}/></MoodSelector>
            </Flex>

            <Close onClick={handleClosing}><FontAwesomeIcon icon={faTimesCircle}/></Close>
        </Container>

        <StyledBackground onClick={handleClosing}></StyledBackground>
    </StyledPopup>

    )
}

export default Popup
