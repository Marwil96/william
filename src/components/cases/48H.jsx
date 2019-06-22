import React, { Component } from 'react';
import { CaseImage, TextBlockHorizontal, CaseHeader, HelmetWrapper } from '../common'
import MetadataContainer from '../containers/MetadataContainer'

import print from '../../images/48H/print.png'
import party from '../../images/48H/party.jpg'

import './case.scss';

class CryptoTracker extends Component {
    componentDidUpdate() {
        window.scrollTo(0,0);
      }

    render() {
        return (
            <div className="CaseContainer CaseContainer--CryptoTracker">
                <HelmetWrapper title='48H - case by William Martinsson' description='Design Competition' />
                <CaseHeader category='Print & Communication' title="Runner-up in Swedens biggest design competition for students." />

                <div className='CaseContainer-content'>
                    <MetadataContainer data={[{label:'Type', title:'Competition' },{label:'Role', title:'Designer' },]} />
                    
                    <TextBlockHorizontal label='48H' text='48H is an advertising competition for students who study media and communication. For two days we worked in teams of 4 to design a print and a digital ad.'  />
                    <TextBlockHorizontal label='Client' text='Goodsports is a non-profit foundation that promotes integration through sport.'  />
                    <TextBlockHorizontal label='Brief' text='Goodsports wanted an advertising strategy to increase general knowledge of Goodsports'  />
                    <TextBlockHorizontal label='Idea & Strategy' text={<span>Sorry for Swedish. <br/><br/>Det sägs att lika barn leker bäst. Vi vill säga att lika barn inte alltid leker bäst. Olikheter behövs för att lära och utmana varandra samt skapa nya förutsättningar. Med projektet Skolträffen vill Goodsport sudda ut gränser mellan individer, bostadsområden och fördomar genom att få ungdomar att mötas. <br/><br/> Vi vill skapa en print som får folk att tänka till och engagerar, en print som är utvecklingsbar och som kan tas ut i alla kanaler. Alla med en smartphone känner till fenomenet autocorrect – funktionen som gör vänliga hälsningar till snuskiga inbjudningar, som både förenklar och förvirrar. Hur kan vi skapa en tankeprocess med hjälp av något så simpelt som autocorrect? Genom att, via en sms-konversation, försöka sudda ut det naturliga alternativet vill vi öppna upp för möjligheten att umgås över stadsdelsgränserna.<br/><br/> Vi ser en möjlighet att ta ut printen på olika språk beroende på vilket område den visas i, vare sig det är i en tidning eller i en busskur. Genom att göra olika prints kan den ses med olika perspektiv. Vi alla behöver göra förändringen tillsammans. Ett exempel kan vara att ha två printannonser på två olika språk som sitter på 11:ans spårvagn från Bergsjön till Saltholmen, eller röda linjen från Norsborg till Danderyds sjukhus.</span>}  />
                    <CaseImage image={print} aspectRatio={'133%'} />
                    <CaseImage image={party} aspectRatio={'133%'} />
                </div>
            </div>
        );
    }
}

export default CryptoTracker;
