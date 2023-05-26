import { render } from 'solid-js/web';
import { createSignal } from 'solid-js';
import { styled } from 'solid-styled-components';
import CharacterCard from './components/cards/character-card1'

const StyledInput = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
`;

const StyledInputStat = styled.div`
    display: flex;
    justify-content: space-between;
    input { outline: none; }
    font-size: 3rem;
`;

const StyledCharacterCard = styled.div`
    width: 100%;
`;

const StyledDiv = styled.div`
    background-image: url('papyr.jpg');
    padding: 3rem;
    display: flex;
    gap: 3rem;
    height: 100%;
`;

const Index = () => {
    const [style, setStyle] = createSignal({
        trim: '#000',
        base: 'rgb(216, 216, 216)',
        fill: 'rgb(150, 150, 150)'
    });

    const [state, setState] = createSignal({
        name: '',
        class: '',
        strength: '',
        dexterity: '',
        constitution: '',
        intelligence: '',
        wisdom: '',
        charisma: '',
        health: '',
        armor: '',
        image: null
    });

    function handleText(event) {
        const text_width = document.createElement('canvas').getContext('2d').measureText(state()[target.name] + event.data).width;
        //Get style  get width
        //Check regex
        //Only then allow
        //if null return early
    }

    function handleStat(event) {
        const target = event.target;
        if (new RegExp(target.pattern).test(state()[target.name] + event.data) || !event.data)
            setState({ ...state(), [target.name]: target.value });
        target.value = state()[target.name];
    }

    function handleImage(event) {
        var reader = new FileReader();
        if (event.target.files[0])
            reader.readAsDataURL(event.target.files[0]);
        reader.onloadend = () => setState({ ...state(), image: reader.result });
    }

    function handleColor(name, hex) {
        setStyle({ ...style, [name]: hex });
    }

    function downloadCard() {
        const svg = document.getElementById('character-card')
        const base64doc = window.btoa(svg.outerHTML);
        const link = document.createElement('a');
        link.download = 'download.svg';
        link.href = 'data:image/svg+xml;base64,' + base64doc;
        link.click()
        link.remove()
    }

    return (
        <StyledDiv>
            <div>
                <StyledInput>
                    <StyledInputStat>
                        Name<input type='text' name='name' value={state().name} pattern='' onInput={handleStat} />
                    </StyledInputStat>
                    <StyledInputStat>
                        Class<input type='text' name='class' value={state().class} pattern='' onInput={handleStat} />
                    </StyledInputStat>
                    <StyledInputStat>
                        STR<input type='text' name='strength' value={state().strength} pattern='^[0-9]{0,2}$' onInput={handleStat} />
                    </StyledInputStat>
                    <StyledInputStat>
                        INT<input type='text' name='intelligence' value={state().intelligence} pattern='^[0-9]{0,2}$' onInput={handleStat} />
                    </StyledInputStat>
                    <StyledInputStat>
                        DEX<input type='text' name='dexterity' value={state().dexterity} pattern='^[0-9]{0,2}$' onInput={handleStat} />
                    </StyledInputStat>
                    <StyledInputStat>
                        WIS<input type='text' name='wisdom' value={state().wisdom} pattern='^[0-9]{0,2}$' onInput={handleStat} />
                    </StyledInputStat>
                    <StyledInputStat>
                        CON<input type='text' name='constitution' value={state().constitution} pattern='^[0-9]{0,2}$' onInput={handleStat} />
                    </StyledInputStat>
                    <StyledInputStat>
                        CHA<input type='text' name='charisma' value={state().charisma} pattern='^[0-9]{0,2}$' onInput={handleStat} />
                    </StyledInputStat>
                    <StyledInputStat>
                        HP<input type='text' name='health' value={state().health} pattern='^[0-9]{0,3}$' onInput={handleStat} />
                    </StyledInputStat>
                    <StyledInputStat>
                        AC<input type='text' name='armor' value={state().armor} pattern='^[0-9]{0,2}$' onInput={handleStat} />
                    </StyledInputStat>
                    <StyledInputStat>
                        <input type='file' name='image' accept='image/*' onChange={handleImage} />
                    </StyledInputStat>
                </StyledInput>
            </div>
            <StyledCharacterCard>
                <CharacterCard state={state()} style={style()} />
                <button onClick={downloadCard}>Download Card</button>
            </StyledCharacterCard>
        </StyledDiv>
    );
}

render(() => (<Index />), document.getElementById('root'));