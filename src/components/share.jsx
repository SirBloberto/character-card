import { createSignal, Show, onMount, batch } from 'solid-js';
import { Portal } from 'solid-js/web';
import { modifyMutable, reconcile } from 'solid-js/store';
import { styled } from 'solid-styled-components';
import { useCard } from '../context/card';
import { useSaved } from '../context/saved';
import { saveStatic, saveDynamic } from '../utilities/save';
import {
    buildShareURL, decodeCard, extractCode, isShortCode,
    shareToAPI, loadFromAPI,
} from '../utilities/share';

/* ─── Shell ──────────────────────────────────────────────────── */

const StyledBackdrop = styled.div`
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.65);
    z-index: 900;
    backdrop-filter: blur(2px);
`;

const StyledModal = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 901;
    width: 340px;
    background: #1a1a22;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 14px;
    box-shadow: 0 24px 64px rgba(0, 0, 0, 0.7);
    overflow: hidden;
`;

const StyledHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.1rem 1.2rem 0.9rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.07);
`;

const StyledTitle = styled.h2`
    font-family: 'Cinzel', serif;
    font-size: 1rem;
    font-weight: 700;
    color: #E8932A;
    letter-spacing: 0.04em;
`;

const StyledClose = styled.button`
    width: 28px;
    height: 28px;
    border-radius: 50%;
    border: 1px solid rgba(255, 255, 255, 0.12);
    background: transparent;
    color: rgba(255, 255, 255, 0.5);
    font-size: 0.8rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: border-color 0.12s, color 0.12s;

    &:hover { border-color: rgba(255,255,255,0.35); color: rgba(255,255,255,0.9); }
`;

/* ─── Tabs ───────────────────────────────────────────────────── */

const StyledTabs = styled.div`
    display: flex;
    border-bottom: 1px solid rgba(255, 255, 255, 0.07);
`;

const StyledTab = styled.button`
    flex: 1;
    padding: 0.65rem;
    background: transparent;
    border: none;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.04em;
    cursor: pointer;
    color: ${props => props.active ? '#fff' : 'rgba(255,255,255,0.35)'};
    border-bottom: 2px solid ${props => props.active ? '#E8932A' : 'transparent'};
    margin-bottom: -1px;
    transition: color 0.12s, border-color 0.12s;

    &:hover { color: ${props => props.active ? '#fff' : 'rgba(255,255,255,0.65)'}; }
`;

/* ─── Body ───────────────────────────────────────────────────── */

const StyledBody = styled.div`
    padding: 1.1rem 1.2rem 1.3rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
`;

const StyledHint = styled.p`
    font-size: 0.72rem;
    color: rgba(255, 255, 255, 0.4);
    line-height: 1.5;
    margin: 0;
`;

const StyledCode = styled.div`
    text-align: center;
    font-family: 'Cinzel', serif;
    font-size: 2rem;
    font-weight: 700;
    letter-spacing: 0.3em;
    color: #E8932A;
    padding: 0.4rem 0;
    text-transform: uppercase;
`;

const StyledInputRow = styled.div`
    display: flex;
    gap: 0.5rem;
`;

const StyledInput = styled.input`
    flex: 1;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    padding: 0.6rem 0.75rem;
    font-size: 0.72rem;
    color: rgba(255, 255, 255, 0.8);
    font-family: 'Inter', monospace;
    outline: none;
    min-width: 0;
    transition: border-color 0.12s;

    &::placeholder { color: rgba(255, 255, 255, 0.25); }
    &:focus { border-color: rgba(255, 255, 255, 0.25); }
`;

const StyledCopyBtn = styled.button`
    flex-shrink: 0;
    padding: 0.6rem 0.85rem;
    border-radius: 8px;
    border: none;
    background: ${props => props.success ? '#3ddc5a' : '#E8932A'};
    color: ${props => props.success ? '#050f05' : '#0a0a0a'};
    font-size: 0.75rem;
    font-weight: 700;
    cursor: pointer;
    transition: background 0.15s, color 0.15s;
    &:hover { background: ${props => props.success ? '#3ddc5a' : '#d4821e'}; }
`;

const StyledPrimaryBtn = styled.button`
    width: 100%;
    padding: 0.65rem;
    border-radius: 8px;
    border: none;
    background: #E8932A;
    color: #0a0a0a;
    font-size: 0.8rem;
    font-weight: 700;
    cursor: pointer;
    transition: background 0.15s;
    opacity: ${props => props.disabled ? 0.4 : 1};
    pointer-events: ${props => props.disabled ? 'none' : 'auto'};

    &:hover { background: #d4821e; }
`;

const StyledError = styled.p`
    font-size: 0.7rem;
    color: #e05050;
    margin: 0;
`;

const StyledSuccess = styled.p`
    font-size: 0.7rem;
    color: #3ddc5a;
    margin: 0;
`;

const StyledNote = styled.p`
    font-size: 0.65rem;
    color: rgba(255, 255, 255, 0.25);
    margin: 0;
    line-height: 1.4;
`;

const StyledSpinner = styled.p`
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.4);
    text-align: center;
    margin: 0;
    padding: 0.5rem 0;
`;

/* ─── Component ──────────────────────────────────────────────── */

const Share = ({ onClose }) => {
    const { style, state, type, setType } = useCard();
    const { cards, setCards, selected, setSelected } = useSaved();

    const [tab, setTab] = createSignal('share');
    const [phase, setPhase] = createSignal('loading'); // 'loading' | 'short' | 'url'
    const [shortCode, setShortCode] = createSignal('');
    const [shareURL, setShareURL] = createSignal('');
    const [loadInput, setLoadInput] = createSignal('');
    const [copied, setCopied] = createSignal(false);
    const [loadError, setLoadError] = createSignal(null);
    const [loadSuccess, setLoadSuccess] = createSignal(false);
    const [loading, setLoading] = createSignal(false);

    onMount(async () => {
        try {
            const { code } = await shareToAPI(style, state, type());
            const url = new URL(window.location.href);
            url.search = '';
            url.searchParams.set('code', code);
            setShortCode(code.toUpperCase());
            setShareURL(url.toString());
            setPhase('short');
        } catch {
            setShareURL(buildShareURL(style, state, type()) ?? '');
            setPhase('url');
        }
    });

    async function copy(text) {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2200);
        } catch {
            document.querySelector('#share-url-input')?.select();
        }
    }

    async function handleLoad() {
        setLoadError(null);
        const raw = loadInput().trim();
        if (!raw) { setLoadError('Paste a share link or code.'); return; }

        const extracted = extractCode(raw);
        setLoading(true);

        let data;
        try {
            if (isShortCode(extracted)) {
                data = await loadFromAPI(extracted);
            } else {
                data = decodeCard(extracted);
                if (!data) throw new Error('Could not decode link');
            }
        } catch (err) {
            setLoadError(err.message || 'Invalid link or code — please check and try again.');
            setLoading(false);
            return;
        }

        if (!data?.v) {
            setLoadError('Unrecognised card format.');
            setLoading(false);
            return;
        }

        batch(() => {
            setCards(selected(), saveStatic(state, style, type()));
            modifyMutable(state, reconcile(data.state ?? {}));
            if (data.style) {
                style.trim = data.style.trim ?? style.trim;
                style.fill = data.style.fill ?? style.fill;
                style.base = data.style.base ?? style.base;
                style.text = data.style.text ?? style.text;
            }
            if (data.type) setType(data.type);
            setCards(cards.length, saveDynamic(state, style, type()));
            setSelected(cards.length - 1);
        });

        setLoading(false);
        setLoadSuccess(true);
        setTimeout(() => onClose?.(), 900);
    }

    return (
        <Portal>
            <StyledBackdrop onClick={onClose}/>
            <StyledModal>
                <StyledHeader>
                    <StyledTitle>Share Card</StyledTitle>
                    <StyledClose onClick={onClose} aria-label="Close">✕</StyledClose>
                </StyledHeader>

                <StyledTabs>
                    <StyledTab active={tab() === 'share'} onClick={() => setTab('share')}>Get Link</StyledTab>
                    <StyledTab active={tab() === 'load'}  onClick={() => setTab('load')}>Load Card</StyledTab>
                </StyledTabs>

                <Show when={tab() === 'share'}>
                    <StyledBody>
                        <Show when={phase() === 'loading'}>
                            <StyledSpinner>Generating link…</StyledSpinner>
                        </Show>

                        <Show when={phase() === 'short'}>
                            <StyledHint>Share this code or copy the full link.</StyledHint>
                            <StyledCode>{shortCode()}</StyledCode>
                            <StyledInputRow>
                                <StyledInput id="share-url-input" readOnly value={shareURL()} onClick={e => e.target.select()}/>
                                <StyledCopyBtn success={copied()} onClick={() => copy(shareURL())}>
                                    {copied() ? '✓' : 'Copy'}
                                </StyledCopyBtn>
                            </StyledInputRow>
                            <StyledNote>Link expires in 30 days. Portrait images are not included.</StyledNote>
                        </Show>

                        <Show when={phase() === 'url'}>
                            <StyledHint>Your card is encoded in this link. Copy and share it — no account needed.</StyledHint>
                            <StyledInputRow>
                                <StyledInput id="share-url-input" readOnly value={shareURL()} onClick={e => e.target.select()}/>
                                <StyledCopyBtn success={copied()} onClick={() => copy(shareURL())}>
                                    {copied() ? '✓' : 'Copy'}
                                </StyledCopyBtn>
                            </StyledInputRow>
                            <StyledNote>Portrait images are not included.</StyledNote>
                        </Show>
                    </StyledBody>
                </Show>

                <Show when={tab() === 'load'}>
                    <StyledBody>
                        <StyledHint>Paste a share link or enter a 6-character code to add that card to your collection.</StyledHint>
                        <StyledInput
                            placeholder="e.g. X7K4Z2 or paste full link…"
                            value={loadInput()}
                            onInput={e => { setLoadInput(e.target.value); setLoadError(null); setLoadSuccess(false); }}
                        />
                        <Show when={loadError()}>
                            <StyledError>{loadError()}</StyledError>
                        </Show>
                        <Show when={loadSuccess()}>
                            <StyledSuccess>Card loaded!</StyledSuccess>
                        </Show>
                        <StyledPrimaryBtn disabled={!loadInput().trim() || loading()} onClick={handleLoad}>
                            {loading() ? 'Loading…' : 'Load Card'}
                        </StyledPrimaryBtn>
                    </StyledBody>
                </Show>
            </StyledModal>
        </Portal>
    );
};

export default Share;
