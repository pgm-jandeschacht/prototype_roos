import React, { useState } from 'react'
import styled from 'styled-components'
import Popup from './Popup'

interface StyledSvgProps {
    pathId: string
}

const StyledSvg = styled.svg<StyledSvgProps>`
    fill: #fff;
    stroke: #000;
    stroke-miterlimit: 10;
    stroke-width: 0.5px;

    g {
        path {
            cursor: pointer;
            transition: all 0.2s ease-in-out;
            &:hover {
                fill: red;
            }

            &#${(StyledSvgProps) => StyledSvgProps.pathId}{
                fill: green;
            }
        }
    }
`

const Rose: React.FC = () => {
    const [category, setCategory] = useState('');
    const [dataId, setDataId] = useState('');
    const [popup, setPopup] = useState(false);

    const handleClicking = (e: React.MouseEvent<SVGElement>) => {
        const data: any = e.target;
        const cat = (data?.dataset.name === undefined ? undefined : data?.dataset.name.split(' - '));
        (cat === undefined || cat[2] === undefined ? setCategory(cat[1]) : setCategory(cat[2]));
        setDataId(data.id);
        setPopup(true);
    }

    const handleClosing = (close: boolean) => {
        if (!close) {
            setPopup(false)
        }
    }

    return (
        <div>
            <StyledSvg pathId={dataId} onClick={handleClicking} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 125.83 125.84">
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
                    <path id="Schijf_1_-_Kind_-Affectieve_functie" data-name="Schijf 1 - Kind -Affectieve functie" className="cls-1"
                    d="M328.38,297.64H312a14.3,14.3,0,0,0-7.18-12.43L313,271A30.72,30.72,0,0,1,328.38,297.64Z"
                    transform="translate(-234.72 -234.72)" />
                    <path id="Schijf_1_-_Kind_-_Fysieke_functie" data-name="Schijf 1 - Kind - Fysieke functie" className="cls-1"
                    d="M313,271l-8.2,14.2a14.3,14.3,0,0,0-14.35,0l-8.2-14.2A30.81,30.81,0,0,1,313,271Z"
                    transform="translate(-234.72 -234.72)" />
                    <path id="Schijf_1_-_Kind_-_Morele_functie" data-name="Schijf 1 - Kind - Morele functie" className="cls-1"
                    d="M290.46,285.21a14.35,14.35,0,0,0-7.18,12.43H266.9A30.74,30.74,0,0,1,282.26,271Z"
                    transform="translate(-234.72 -234.72)" />
                    <circle id="Schijf_1_-_Kind-2" data-name="Schijf 1 - Kind" className="cls-1" cx="62.92" cy="62.92" r="14.36" />
                </g>
                <g id="Schijf_2_-_Pedagogisch_besef" data-name="Schijf 2 - Pedagogisch besef">
                    <path id="Schijf_2_-_Pedagogisch_besef-2" data-name="Schijf 2 - Pedagogisch besef" className="cls-1"
                    d="M276.56,258.92a44,44,0,0,0-23,38.72H235a62.65,62.65,0,0,1,30.92-54Z" transform="translate(-234.72 -234.72)" />
                    <path id="Schijf_2_-_Pedagogisch_besef_-_Verwachting" data-name="Schijf 2 - Pedagogisch besef - Verwachting"
                    className="cls-1"
                    d="M332.22,245.37,320.7,260.06a44.14,44.14,0,0,0-44.14-1.14l-10.67-15.33a62.73,62.73,0,0,1,66.33,1.78Z"
                    transform="translate(-234.72 -234.72)" />
                    <path id="Schijf_2_-_Pedagogisch_besef_-_Attributies" data-name="Schijf 2 - Pedagogisch besef - Attributies"
                    className="cls-1" d="M360.3,297.64H341.72a44.06,44.06,0,0,0-21-37.58l11.52-14.69A62.62,62.62,0,0,1,360.3,297.64Z"
                    transform="translate(-234.72 -234.72)" />
                    <path id="Schijf_2_-_Pedagogisch_besef-3" data-name="Schijf 2 - Pedagogisch besef" className="cls-1"
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
                    <path id="Schijf_2_-_Hechting-2" data-name="Schijf 2 - Hechting" className="cls-1"
                    d="M341.72,297.64a44.09,44.09,0,1,1-88.17,0H266.9a30.74,30.74,0,0,0,61.48,0Z"
                    transform="translate(-234.72 -234.72)" />
                </g>
            </StyledSvg>

            <p>{category}</p>

            <Popup name={category} open={popup} onClose={handleClosing} />
        </div>
    )
}

export default Rose
