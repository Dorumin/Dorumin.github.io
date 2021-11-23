import type { NextPage } from 'next';
import Head from 'next/head';
import { Bot } from '../components/Bot';

import bots from '../styles/Bots.module.scss';
bots;

function BotList() {
    return (
        <div class="bot-list">
            <div class="bot-wrapper">
                <div class="tit">A collection of bots that I have made over the years</div>

                <Bot
                    name="Opal"
                    avatar="https://cdn.discordapp.com/avatars/348233224293449729/cba274964285887111a2a0afa412a193.png?size=2048"
                    description="The original beauty"
                    github="OpalBot"
                    link="https://opalbot-loader.herokuapp.com"
                />

                <Bot
                    name="Twinkle"
                    avatar="https://cdn.discordapp.com/avatars/629152181752430602/88bb02df024ad65a92fd53e6c493f350.png?size=2048"
                    description="Twonkle does things that a Twonk does"
                    github="Twinkle"
                />

                <Bot
                    name="Hopal"
                    avatar="https://cdn.discordapp.com/avatars/854467801930137691/31c0a6a6d0587808b1d474df50309171.png?size=2048"
                    description="The not-stick-in-the-mud version of Twinkle"
                    github="Hopal"
                />
            </div>
        </div>
    );
}

const Bots: NextPage = () => {
    return (
        <div class='main-bots'>
            <Head>
                <title>Boats</title>
                <meta name="description" content="Please do not disturb" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <BotList />
        </div>
    );
};

export default Bots;
