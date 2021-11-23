import styles from '../styles/Bot.module.scss';
styles;

import Image from 'next/image';
import Link from 'next/link';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkIcon from '@mui/icons-material/Link';

type BotProps = {
    name: string;
    avatar: string;
    description: string;
    github: string;
    link?: string;
};

export function Bot({ name, avatar, description, github, link }: BotProps) {
    return (
        <div class="bot">
            <div class="bot-avatar">
                <Image
                    alt="avatar"
                    src={avatar}
                    width={150}
                    height={150}
                />
            </div>
            <div class="bot-info">
                <div class="header">
                    <div class="username">{name}</div>
                    <Link
                        href={`https://github.com/Dorumin/${github}`}
                    >
                        <a class="github" target="_blank">
                            <GitHubIcon htmlColor="white" />
                        </a>
                    </Link>
                    {
                        link && <Link
                            href={link}
                        >
                            <a class="link" target="_blank">
                                <LinkIcon htmlColor="white" />
                            </a>
                        </Link>
                    }
                </div>
                <div class="description">{description}</div>
            </div>
        </div>
    );
}
