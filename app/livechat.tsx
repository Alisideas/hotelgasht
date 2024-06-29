"use client";

import { useEffect } from 'react';

const LiveChat = () => {
    useEffect(() => {
        var Tawk_API: any = Tawk_API || {}, Tawk_LoadStart = new Date();
        (function () {
            var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
            s1.async = true;
            s1.src = 'https://embed.tawk.to/66757df29d7f358570d1f7c2/1i0tf7urv';
            s1.charset = 'UTF-8';
            s1.setAttribute('crossorigin', '*');
            if (s0.parentNode) {
                s0.parentNode.insertBefore(s1, s0);
            }
        })();
    }, []);

    return (
    <div>

    </div>
    );
}

export default LiveChat;
