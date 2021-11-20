import type { NextPage } from 'next';
import Head from 'next/head';

import styles from '../styles/Home.module.scss';

const Home: NextPage = () => {
    return (
        <div class={styles.main}>
            <Head>
                <title>Under construction</title>
                <meta name="description" content="Please do not disturb" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            One day, this page will be interesting.
            <br />
            But today is not that day
        </div>
    );
};

export default Home;
