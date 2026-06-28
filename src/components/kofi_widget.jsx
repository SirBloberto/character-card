import { onMount } from "solid-js";

export default function KofiWidget() {
    onMount(() => {
        const script = document.createElement("script");
        script.src = "https://storage.ko-fi.com/cdn/scripts/overlay-widget.js";
        script.async = true;

        script.onload = () => {
            if (window.kofiWidgetOverlay) {
                window.kofiWidgetOverlay.draw("sirbloberto", {
                    'type': 'floating-chat',
                    'floating-chat.donateButton.text': 'Support',
                    'floating-chat.donateButton.background-color': '#00b9fe',
                    'floating-chat.donateButton.text-color': '#fff'
                });
            }
        };
        document.body.appendChild(script);
    });

    return (
        <style>
            {`
                .floatingchat-container-wrap {
                    left: auto !important;
                    right: 250px !important;
                    z-index: 400 !important;
                }

                .floatingchat-container-wrap-mobi {
                    z-index: 400 !important;
                }

                .floating-chat-kofi-popup-iframe {
                    left: auto !important;
                    right: 260px !important;
                    z-index: 400 !important;
                }

                @media (max-width: 719px) {
                    .floatingchat-container-wrap {
                        right: 80px !important;
                    }
                    .floating-chat-kofi-popup-iframe {
                        right: 10px !important;
                    }
                }

                :fullscreen .floatingchat-container-wrap,
                :fullscreen .floatingchat-container-wrap-mobi,
                :fullscreen .floating-chat-kofi-popup-iframe,
                :-webkit-full-screen .floatingchat-container-wrap,
                :-webkit-full-screen .floatingchat-container-wrap-mobi,
                :-webkit-full-screen .floating-chat-kofi-popup-iframe {
                    display: none !important;
                }
            `}
        </style>
    );
}