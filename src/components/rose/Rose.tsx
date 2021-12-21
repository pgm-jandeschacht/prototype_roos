import React, { useState, useRef, useEffect, SyntheticEvent } from 'react'
import Popup from './Popup'
import styled from 'styled-components'

const StyledDiv = styled.div`
    position: relative;
    max-width: 80rem;
    margin: auto;
    overflow-y: hidden;
    width: 100vw;
    height: 100vh;
    /* background: red; */
    /* -ms-overflow-style: none;
    scrollbar-width: none; */
`

const StyledButton = styled.button`
    position: absolute;
    background: red;
    padding: 0.5rem 1rem;
    color: white;
    font-weight: bold;
`

interface StyledSvgProps {
    pathId: string,
    open: boolean,
    group: any,
    noSB: number,
    scaling: number,
    isVisible: boolean
}

const StyledSvg = styled.svg<StyledSvgProps>`
    background: yellow;
    cursor: move;
    touch-action: none;
    transition: all 0.3s ease-in-out;
    position: absolute;
    fill: #fff;
    stroke: #000;
    stroke-miterlimit: 10;
    stroke-width: 0.5px;
    width: 100%;
    max-width: 80rem;
    margin: auto;
    display: ${(StyledDivProps) => StyledDivProps.isVisible ? 'block' : 'none'};
    
    g {
        transform: ${(StyledDivProps) => `scale(${StyledDivProps.scaling})`};
        /* transition: all 0.2s ease-in-out; */
        path {
            transition: all 0.2s ease-in-out;
            &:hover {
                fill: #1a77d5;
            }
            
            &#${(StyledSvgProps) => StyledSvgProps.pathId}{
                fill: #E12FEE;
            }
        }
        
        &#${(StyledSvgProps) => StyledSvgProps.group.id} {
            fill: #3799FB80

        }
    }
`

const Rose: React.FC = () => {
    const [categoryId, setCategoryId] = useState('');
    const [dataId, setDataId] = useState('');
    const [popup, setPopup] = useState(false);
    const [cats, setCats] = useState(null);
    const [groupId, setGroupId] = useState('');
    const [width, setWidth] = useState(0)
    const [pointerOrigin, setPointerOrigin] = useState({x: 0, y: 0});
    const [viewBox, setViewBox] = useState({x: 0, y: 0, width: 125.83, height: 125.84});
    
    const handleClicking = (e: React.MouseEvent<SVGElement>) => {
        const data: any = e.target;
        setCategoryId(data.id);
        setDataId(data.id);
        
        if(data.nodeName !== 'svg' && pointerOrigin.x === e.clientX) {
            setGroupId(data.parentNode);
            setPopup(true);
        }
    }
    
    const handleClosing = (close: boolean) => {
        if (!close) {
            setPopup(false)
        }
    }
    
    const rose = useRef(null);
    
    const [isPointerDown, setIsPointerDown] = useState(false)
    const [newViewBox, setNewViewBox] = useState({x: 0, y: 0});
    const [ratio, setRatio] = useState(0)
    const [viewBoxString, setViewBoxString] = useState('0 0 125.83 125.84')
    const [scale, setScale] = useState(1)
    const [loaded, setLoaded] = useState(false)
    var svg: any = rose.current;
    
    useEffect(() => {
        setCats(rose.current);
        
        if(svg !== null && loaded === false) {
            setLoaded(true);
            svg.setAttribute('viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`);
        } else if (svg !== null && loaded === true) {
            setRatio(viewBox.width / svg.getBoundingClientRect().width);
        }

        setWidth(document.body.clientWidth);        
    }, [svg, viewBox.width, loaded])
    
    
    window.addEventListener('resize', function() {
        setWidth(document.body.clientWidth)

        if(svg !== null) {
            setRatio(viewBox.width / svg.getBoundingClientRect().width);
        }
        
    });

    const onDown = (e: React.MouseEvent) => {
        setIsPointerDown(true);
        setPointerOrigin({x: e.clientX, y: e.clientY});
    }
    
    const onMove = (e: React.MouseEvent) => {
        if(isPointerDown) {
            setNewViewBox({x: viewBox.x - ((e.clientX - pointerOrigin.x) * ratio), y: viewBox.y - ((e.clientY - pointerOrigin.y) * ratio)})

            setViewBoxString(`${newViewBox.x} ${newViewBox.y} ${viewBox.width} ${viewBox.height}`)
            svg.setAttribute('viewBox', viewBoxString)
        }
    }

    const onUp = () => {
        setIsPointerDown(false);
        setViewBox({x: newViewBox.x, y: newViewBox.y, width: 125.83, height: 125.84});
    }

    const handleScroll = (e: React.WheelEvent<HTMLDivElement>) => {
        const ZOOM_SPEED = -0.005;
        setScale(Math.min(Math.max(.25, scale + (e.deltaY * ZOOM_SPEED)), 2.25))
        // svg.setAttribute('viewBox', '-62.5 -62.5 125.83 125.84')
    }

    const handleReset = () => {
        setScale(1)
        setViewBox({x: 0, y: 0, width: 125.83, height: 125.84})
        setPointerOrigin({x: 0, y: 0})
        setNewViewBox({x: 0, y: 0})
        setViewBoxString('0 0 125.83 125.84')
        svg.setAttribute('viewBox', '0 0 125.83 125.84')
    }

    return (
        <StyledDiv onWheel={handleScroll} >
            <StyledSvg isVisible={loaded} scaling={scale} noSB={width} onPointerMove={onMove} onPointerDown={onDown} onPointerUp={onUp} ref={rose} group={groupId} pathId={dataId} open={popup} onClick={handleClicking} xmlns="http://www.w3.org/2000/svg">
                <g id="Schijf_1_-_Kind" data-name="Schijf 1 - Kind">
                    <path id="Schijf_1_-_Kind_-_Cognitieve_functie" data-name="Schijf 1 - Kind - Cognitieve functie" className="cls-1"
                    d="M290.46,310.06l-8.2,14.21a30.74,30.74,0,0,1-15.36-26.63h16.38A14.32,14.32,0,0,0,290.46,310.06Z"
                    transform="translate(-234.72 -234.72)" />
                    <path id="Schijf_1_-_Kind_-_Conatieve_functie" data-name="Schijf 1 - Kind - Conatieve functie" className="cls-1"
                    d="M313,324.27a30.81,30.81,0,0,1-30.75,0l8.2-14.21a14.33,14.33,0,0,0,14.35,0Z"
                    transform="translate(-234.72 -234.72)" />
                    <path id="Schijf_1_-_Kind_-_Gedragsfunctie" data-name="Schijf 1 - Kind - Gedragsfunctie" className="cls-1"
                    d="M328.38,297.64A30.72,30.72,0,0,1,313,324.27l-8.2-14.2A14.31,14.31,0,0,0,312,297.64Z"
                    transform="translate(-234.72 -234.72)" />
                    <path id="Schijf_1_-_Kind_-_Affectieve_functie" data-name="Schijf 1 - Kind - Affectieve functie" className="cls-1"
                    d="M328.38,297.64H312a14.3,14.3,0,0,0-7.18-12.43L313,271A30.72,30.72,0,0,1,328.38,297.64Z"
                    transform="translate(-234.72 -234.72)" />
                    <path id="Schijf_1_-_Kind_-_Fysieke_functie" data-name="Schijf 1 - Kind - Fysieke functie" className="cls-1"
                    d="M313,271l-8.2,14.2a14.3,14.3,0,0,0-14.35,0l-8.2-14.2A30.81,30.81,0,0,1,313,271Z"
                    transform="translate(-234.72 -234.72)" />
                    <path id="Schijf_1_-_Kind_-_Morele_functie" data-name="Schijf 1 - Kind - Morele functie" className="cls-1"
                    d="M290.46,285.21a14.35,14.35,0,0,0-7.18,12.43H266.9A30.74,30.74,0,0,1,282.26,271Z"
                    transform="translate(-234.72 -234.72)" />
                    <circle id="Schijf_1_-_Kind_-_Niets1" data-name="Schijf 1 - Kind - Niets" className="cls-1" cx="62.92" cy="62.92" r="14.36" />
                </g>
                <g id="Schijf_2_-_Pedagogisch_besef" data-name="Schijf 2 - Pedagogisch besef">
                    <path id="Schijf_2_-_Pedagogisch_besef_-_Niets2" data-name="Schijf 2 - Pedagogisch besef - Niets" className="cls-1"
                    d="M276.56,258.92a44,44,0,0,0-23,38.72H235a62.65,62.65,0,0,1,30.92-54Z" transform="translate(-234.72 -234.72)" />
                    <path id="Schijf_2_-_Pedagogisch_besef_-_Verwachting" data-name="Schijf 2 - Pedagogisch besef - Verwachting"
                    className="cls-1"
                    d="M332.22,245.37,320.7,260.06a44.14,44.14,0,0,0-44.14-1.14l-10.67-15.33a62.73,62.73,0,0,1,66.33,1.78Z"
                    transform="translate(-234.72 -234.72)" />
                    <path id="Schijf_2_-_Pedagogisch_besef_-_Attributies" data-name="Schijf 2 - Pedagogisch besef - Attributies"
                    className="cls-1" d="M360.3,297.64H341.72a44.06,44.06,0,0,0-21-37.58l11.52-14.69A62.62,62.62,0,0,1,360.3,297.64Z"
                    transform="translate(-234.72 -234.72)" />
                    <path id="Schijf_2_-_Pedagogisch_besef_-_Niets3" data-name="Schijf 2 - Pedagogisch besef - Niets" className="cls-1"
                    d="M341.72,297.64H328.38a30.74,30.74,0,0,0-61.48,0H253.55a44.09,44.09,0,1,1,88.17,0Z"
                    transform="translate(-234.72 -234.72)" />
                </g>
                <g id="Schijf_2_-_Hechting" data-name="Schijf 2 - Hechting">
                    <path id="Schijf_2_-_Hechting_-_Zelfreflectie_en_mentaliseren"
                    data-name="Schijf 2 - Hechting - Zelfreflectie en mentaliseren" className="cls-1"
                    d="M360.3,297.64A62.62,62.62,0,0,1,332.09,350L321.9,334.44a44,44,0,0,0,19.82-36.8Z"
                    transform="translate(-234.72 -234.72)" />
                    <path id="Schijf_2_-_Hechting_-_Sensitiviteit_en_responsiviteit"
                    data-name="Schijf 2 - Hechting - Sensitiviteit en responsiviteit" className="cls-1"
                    d="M332.09,350a62.35,62.35,0,0,1-34.45,10.31,63.14,63.14,0,0,1-14.91-1.78l4.73-18a44.38,44.38,0,0,0,10.18,1.18,43.86,43.86,0,0,0,24.26-7.28Z"
                    transform="translate(-234.72 -234.72)" />
                    <path id="Schijf_2_-_Hechting_-_Beschikbaarheid" data-name="Schijf 2 - Hechting - Beschikbaarheid" className="cls-1"
                    d="M287.46,340.54l-4.73,18a62.72,62.72,0,0,1-35-22.95l14-12.26A44.12,44.12,0,0,0,287.46,340.54Z"
                    transform="translate(-234.72 -234.72)" />
                    <path id="Schijf_2_-_Hechting_-_Acceptatie" data-name="Schijf 2 - Hechting - Acceptatie" className="cls-1"
                    d="M261.8,323.32l-14,12.26A62.35,62.35,0,0,1,235,297.64h18.58A43.82,43.82,0,0,0,261.8,323.32Z"
                    transform="translate(-234.72 -234.72)" />
                    <path id="Schijf_2_-_Hechting_-_Niets4" data-name="Schijf 2 - Hechting - Niets" className="cls-1"
                    d="M341.72,297.64a44.09,44.09,0,1,1-88.17,0H266.9a30.74,30.74,0,0,0,61.48,0Z"
                    transform="translate(-234.72 -234.72)" />
                </g>
            </StyledSvg>

            <StyledButton onClick={handleReset}>Reset</StyledButton>

            <Popup category={categoryId} open={popup} onClose={handleClosing} categories={cats} active={groupId}/>
        </StyledDiv>
    )
}

export default Rose
