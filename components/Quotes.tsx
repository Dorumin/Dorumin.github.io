import { useState, useEffect, useCallback } from 'react';
import CachedIcon from '@mui/icons-material/Cached';
import styles from '../styles/Quotes.module.scss';
styles;

const quotes = [
    'I usually do programming underwater, so no one can see me cry',
    `There's only a finite amount of ways to fuck up, so eventually you'll finish!`
];

function getRandomQuote() {
    return quotes[Math.floor(Math.random() * quotes.length)];
}

export default function Quotes() {
    const [quote, setQuote] = useState(getRandomQuote);
    const [displayedQuote, setDisplayedQuote] = useState('');

    useEffect(() => {
        let stop = false;
        let len = 0;

        function setQuote() {
            if (stop) return;

            setDisplayedQuote(quote.slice(0, len));

            len++;

            if (len > quote.length) return;

            requestAnimationFrame(setQuote);
        }

        setQuote();

        return () => {
            stop = true;
        };
    }, [quote]);

    const onQuoteClick = useCallback((e) => {
        e.preventDefault();
        setQuote(getRandomQuote());
    }, []);

    return (
        <div class="quote">
            <div className="displayed-quote">
                {displayedQuote}
            </div>
            <div class="refresh">
                <CachedIcon onClick={onQuoteClick} />
            </div>
        </div>
    );
}
