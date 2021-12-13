import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMeh, faSmile, faFrown } from '@fortawesome/free-regular-svg-icons'

interface PopupProps {
    name: string,
    open: boolean,
    onClose: (close: boolean) => void,
    categories: any,
    active: any
}

interface StyledPopupProps {
    isVisible: boolean
}

const StyledPopup = styled.div<StyledPopupProps>`
    position: fixed;
    width: 65%;
    height: 100%;
    top: 0;
    left: ${(StyledPopupProps) => StyledPopupProps.isVisible ? '35%' : '100%'};
    transition: all 0.3s ease-in-out;
    border-radius: 30px;
    overflow: hidden;
`

const Container = styled.div`
    display: flex;
    height: 100%;
`

const StyledBox = styled.div`
    padding: 2rem;
    width: 60%;
`

const Title = styled.p`
    font-family: Arial, Helvetica, sans-serif;
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0;
    margin-bottom: 1.5rem;
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
    background: none;
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

const StyledSideNav = styled.div`
    padding: 2rem;
    padding-top: 12.5rem;
    width: 40%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

interface StyledListProps {
    groupId: string
}

const StyledList = styled.ul<StyledListProps>`
    display: flex;
    flex-direction: column;

    li {
        cursor: pointer;
        padding-bottom: 1.5rem;
        padding-left: 1.5rem;
        position: relative;
        transition: all 0.2s ease-in-out;
        color: #777a7c;

        &:before {
            background: #001429;
            width: 2px;
            content: '';
            position: absolute;
            top: 0.75rem;
            bottom: -0.75rem;
            left: 0.25rem;
        }

        &:after {
            transition: all 0.2s ease-in-out;
            content: '';
            position: absolute;
            width: 0.625rem;
            height: 0.625rem;
            border-radius: 50%;
            background: #001429;
            left: 0;
            top: calc(50% - 1.5rem);
            transform: translateY(calc(-50% + 0.75rem));
        }

        &:last-of-type {
            &:before {
                width: 0;
            }
        }

        &#${(StyledListProps) => StyledListProps.groupId} {
            font-weight: bold;
            font-size: 1.2rem;
            color: #001429;
            
            &:after {
                left: -0.1875rem;
                width: 1rem;
                height: 1rem;
                background: #1a77d5;
            }
        }
        
        &:hover {
            color: #001429;
        }
    }
`

const Close = styled.button`
    padding: 0.8rem;
    border-radius: 100px;
    transition: all 0.2s ease-in-out;
    font-size: 1.5rem;
    background: #3799FB;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;

    &:hover {
        background: #1a77d5;
    }
`

const StyledBackground = styled.div`
    z-index: -1;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: #fff;
    opacity: 95%;
`

const Popup: React.FC<PopupProps> = ({ name, open, onClose, categories, active }) => {
    const [close, setClose] = useState(true);
    const [buttons, setButtons] = useState({ 'id': '' });

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

    const catsList = categories !== null ? [...categories.childNodes] : undefined;


    return (
        
        <StyledPopup isVisible={open}>
            <Container>
                <StyledBox>
                    <Title>{name}</Title>
                                
                    <Flex>
                        <MoodSelector onClick={handleMood} buttonColor={buttons.id} moodColor={"green"}><FontAwesomeIcon id="green" icon={faSmile}/></MoodSelector>

                        <MoodSelector onClick={handleMood} buttonColor={buttons.id} moodColor={"orange"}><FontAwesomeIcon id="orange" icon={faMeh}/></MoodSelector>

                        <MoodSelector onClick={handleMood} buttonColor={buttons.id} moodColor={"red"}><FontAwesomeIcon id="red" icon={faFrown}/></MoodSelector>
                    </Flex>
                </StyledBox>
                
                <StyledSideNav>
                    <StyledList groupId={active.id}>
                        {
                            catsList === undefined ? '' :
                            catsList.map((cat: any, index: number) => (
                                <li id={cat.id} key={index}>
                                    {cat.dataset.name}
                                </li>
                            ))
                        }
                    </StyledList>


                    <Close onClick={handleClosing}>Afsluiten</Close>
                </StyledSideNav>
            </Container>

            <StyledBackground></StyledBackground>
        </StyledPopup>
    )
}

export default Popup
