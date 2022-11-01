import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';





export default function Video() {
    const {siteConfig} = useDocusaurusContext();
    return (
        <Layout
            title={`Hello from ${siteConfig.title}`}
            description="Description will go into a meta tag in <head />">
            <main>
                <iframe src="//player.bilibili.com/player.html?aid=859146839&bvid=BV1mV4y1V76K&cid=866259590&page=1"/>
            </main>
        </Layout>
    );
}
