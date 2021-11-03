import { useState } from "react";

const quotes = [
    'I usually do programming underwater, so no one can see me cry',
    `There's only a finite amount of ways to fuck up, so eventually you'll finish!`
]

function setQuote() {
    // rng here whatever
}

export default function Quoter() {
    const [ quote, setQuote ] = useState(false);

    return (
        <div className="quote">
            {quote}
        </div>
    );
}
