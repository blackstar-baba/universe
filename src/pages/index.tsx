import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import TypeIt from "typeit-react";

import styles from './index.module.css';
import Highlight from "../components/Hightlight";

const Svg = ({Svg, color, link}) => {
    return (
        <a href={link} target='_blank'>
            <Svg className={styles.svg} style={{fill: color,width: '100%', height: '100%'}}/>
        </a>
    )
};

const programmer = {
    title: 'programmer',
    color: null,
    Svg: require('@site/static/img/programmer.svg').default,
    link: 'https://github.com/blackstar-baba',
};

const information = `> select * from me;

# +----------------+-------------------------+
# |  📃 resume     | value                   |
# +----------------+-------------------------+
# |  😜 name       | black star              |
# |  💼 job        | Software Architect      |
# |  🌎 github id  | blackstar-baba          |
# |  📱 phone      | +8618500430817          |
# +----------------+-------------------------+

> select * from skills;

# +-------------+-------------+---------------------+
# | name        | exp         |                     |
# +-------------+-------------+---------------------+
# | Java        | 10Y         |🎖🎖🎖🎖🎖             
# | C++         | 2Y          |🎖🎖                  
# | JavaScript  | 2Y          |🎖🎖                  
# | Python      | 1Y          |🎖                    
# | Go          | 1Y          |🎖                    
# +-------------+-----------------------------------+ 
`;


function MyHero() {
    return (
        <div className={styles.myHeroContainer}>
            <div className={styles.leftContainer}>
               <Svg {...programmer}/>
            </div>
            <div className={styles.rightContainer}>
                <div className={styles.editor}>
                    <div className={styles.code}>
                        <TypeIt
                            options={{
                                startDelay: 1000,
                                speed: 1,
                                waitUntilVisible: true,
                                cursor: true,
                            }}
                        >
                            <Highlight code={information}/>
                        </TypeIt>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default function Home(): JSX.Element {
    const {siteConfig} = useDocusaurusContext();
    return (
        <Layout
            title={`Hello from ${siteConfig.title}`}
            description="Description will go into a meta tag in <head />">
            <main>
                <MyHero/>
            </main>
        </Layout>
    );
}
