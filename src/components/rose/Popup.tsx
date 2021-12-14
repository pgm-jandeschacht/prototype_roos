import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMeh, faSmile, faFrown } from '@fortawesome/free-regular-svg-icons'
import { faMale, faFemale } from '@fortawesome/free-solid-svg-icons'

interface PopupProps {
    category: string,
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
    max-width: 64rem;
    margin: auto;
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
    font-size: 1.75rem;
    font-weight: bold;
    margin: 0;
    margin-bottom: 2rem;

    span {
        font-size: 1.25rem;
        font-weight: normal;
    }
`

const Parents = styled.ul`
    display: flex;
    justify-content: space-between;
    margin: 0 6rem;
    margin-bottom: 1.5rem;

    li {
        display: flex;
        flex-direction: column;
        align-items: center;

        svg {
            height: 2.5rem!important;
            width: auto!important;
            margin-bottom: 0.75rem;
        }

        p {
            font-size: 0.9rem;
        }
    }
`

interface SubCatsProps {
    selected: string
}

const SubCats = styled.ul<SubCatsProps>`
    overflow-y: auto;
    height: calc(100% - 4rem - 2rem - 4.25rem);
    
    li {
        padding: 1.5rem 0.5rem;
        border-bottom: 1px solid #001429;
        
        &#${(SubCatsProps) => SubCatsProps.selected} {
            p {
                font-weight: bold;
                font-size: 1.4rem;
            }
        }
        
        p {
            transition: all 0.2s ease-in-out;
            font-size: 1.2rem;
        }

        &:last-of-type {
            border: none;
            padding-bottom: 0;
        }
    }
`

const FlexSelectors = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
    padding: 0 0.5rem;

    div {
        display: flex;
        align-items: center;
        justify-content: center;

        button {
            margin-right: 0.8rem;
            
            &:last-of-type {
                margin-right: 0;
            }
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
        color: ${(MoodSelectorProps) => (MoodSelectorProps.moodColor === MoodSelectorProps.buttonColor && MoodSelectorProps.buttonColor !== undefined ? MoodSelectorProps.buttonColor : '#3799FB80')};
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
        padding-left: 1.5rem;
        position: relative;
        transition: all 0.2s ease-in-out;
        
        button {
            padding-bottom: 1.5rem;
            transition: all 0.2s ease-in-out;
            color: #777a7c;
            font-size: 1rem;
            text-align: left;

            &:hover {
                color: #001429;
            }
        }

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
            button {
                font-weight: bold;
                font-size: 1.2rem;
                color: #001429;
            }
            
            &:after {
                left: -0.1875rem;
                width: 1rem;
                height: 1rem;
                background: #3799FB;
            }
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

const Popup: React.FC<PopupProps> = ({ category, open, onClose, categories, active }) => {
    const [close, setClose] = useState(true);
    const [buttons, setButtons] = useState({ 'id': '' });
    const [activeState, setActiveState] = useState('');
    const [title, setTitle] = useState('');
    const [subCatsList, setSubCatsList] = useState(new Array(active === '' ? 0 : active.childNodes.length).fill(null));
    const [catsList, setCatsList] = useState(new Array(categories === null ? 0 : categories.childNodes.length).fill(null));

    const handleClosing = () => {
        setClose(false);
        setButtons({'id': ''})
    }

    useEffect(() => {
        onClose(close);
        setClose(true);
        setActiveState(active.id)
        setTitle(active.dataset === undefined || active.dataset.name === undefined ? '' : active.dataset.name.split(' - '));
        setSubCatsList(active.childNodes !== undefined ? active.childNodes : undefined);
        setCatsList(categories !== null ? categories.childNodes : undefined);
    }, [onClose, close, active.dataset, active.id, active.childNodes, categories]);
    
    const handleMood = (e: React.MouseEvent<HTMLButtonElement>) => {
        const event: any = e.target;
        setButtons({'id': (event.id || event.parentNode.id)})
    }

    const handleClicking = (e: React.MouseEvent<HTMLButtonElement>) => {
        const data: any = e.target;
        const dataName = data.dataset.name;
        const catsArray = [...catsList]
        // console.log(catsArray)
        catsArray.map(CA => {
            if(dataName === CA.id) {
                setSubCatsList(CA.childNodes);
                // console.log(CA)
            }
        })
        // if(dataName === ) {

        // }
        // setSubCatsList(data)
        setActiveState(data.dataset.name);
        setTitle(data.innerText.split(' - '));
    }

    const catsListArray = catsList !== undefined ? [...catsList] : undefined;
    
    const subCatsListArray = subCatsList !== undefined ? [...subCatsList] : undefined;

    return (
        
        <StyledPopup isVisible={open}>
            <Container>
                <StyledBox>
                    <Title>{title[0]} - <span>{title[1]}</span></Title>

                    <Parents>
                        <li>
                            <FontAwesomeIcon icon={faMale} /> 
                            <p>Ouder 1</p>
                        </li>

                        <li>
                            <FontAwesomeIcon icon={faFemale} /> 
                            <p>Ouder 2</p>
                        </li>
                    </Parents>

                    <SubCats selected={category}>
                        {
                            subCatsListArray === undefined ? '' :
                            subCatsListArray.map((subCat: any, index: number) => (
                                <li key={index} id={subCat.id}>
                                    <p>
                                        {subCat.dataset.name.split(' - ')[2]}
                                    </p>
                                    <FlexSelectors>
                                        <div>
                                            <MoodSelector onClick={handleMood} buttonColor={buttons.id} moodColor={"green"}><FontAwesomeIcon id="green" icon={faSmile}/></MoodSelector>

                                            <MoodSelector onClick={handleMood} buttonColor={buttons.id} moodColor={"orange"}><FontAwesomeIcon id="orange" icon={faMeh}/></MoodSelector>

                                            <MoodSelector onClick={handleMood} buttonColor={buttons.id} moodColor={"red"}><FontAwesomeIcon id="red" icon={faFrown}/></MoodSelector>
                                        </div>

                                        <div>
                                            <MoodSelector onClick={handleMood} buttonColor={buttons.id} moodColor={"green"}><FontAwesomeIcon id="green" icon={faSmile}/></MoodSelector>

                                            <MoodSelector onClick={handleMood} buttonColor={buttons.id} moodColor={"orange"}><FontAwesomeIcon id="orange" icon={faMeh}/></MoodSelector>

                                            <MoodSelector onClick={handleMood} buttonColor={buttons.id} moodColor={"red"}><FontAwesomeIcon id="red" icon={faFrown}/></MoodSelector>
                                        </div>
                                    </FlexSelectors>
                                </li>
                            ))
                        }
                    
                    </SubCats>

                </StyledBox>
                
                <StyledSideNav>
                    <StyledList groupId={activeState}>
                        {
                            catsListArray === undefined ? '' :
                            catsListArray.map((cat: any, index: number) => (
                                <li id={cat.id} key={index}>
                                    <button data-name={cat.id} onClick={handleClicking}>
                                        {cat.dataset.name}
                                    </button>
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
