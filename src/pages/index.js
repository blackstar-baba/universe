import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import {Vector3, SceneLoader, Tools, ArcRotateCamera, HemisphericLight, Color4} from '@babylonjs/core';
import '@babylonjs/loaders/glTF';
import Assets from '@babylonjs/assets';
import SceneComponent from './SceneComponent';

import styles from './index.module.css';

const svgList = [
    {
        title: 'github',
        Svg: require('@site/static/img/github.svg').default,
        color: 'black',
        link: 'https://github.com/blackstar-baba',
    },
    {
        title: 'bilibili',
        Svg: require('@site/static/img/bilibili.svg').default,
        link: 'https://space.bilibili.com/696589672',
    }
];

const Svg = ({Svg, color, link}) => {
    return (
        <a href={link} target='_blank'>
            <Svg className={styles.svg} style={{fill: color}}/>
        </a>
    )
};

let box;

const onSceneReady = (scene) => {

    scene.clearColor = new Color4(0, 0, 0, 0);

    const canvas = scene.getEngine().getRenderingCanvas();
    // This creates and positions a free camera (non-mesh)
    var camera = new ArcRotateCamera("camera",
        Tools.ToRadians(90), Tools.ToRadians(65), 40, Vector3.Zero(), scene);

    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);

    // Default intensity is 1. Let's dim the light a big amount
    light.intensity = 1;

    // SceneLoader.ImportMeshAsync("", Assets.meshes.BrainStem.rootUrl, Assets.meshes.BrainStem.filename);
    SceneLoader.ImportMesh("", Assets.meshes.BrainStem.rootUrl, Assets.meshes.BrainStem.filename, scene, function (meshes) {

        scene.createDefaultCameraOrLight(true, true, true);
        // scene.createDefaultEnvironment();
    });
};

/**
 * Will run on every frame render.  We are spinning the box on y-axis.
 */
const onRender = (scene) => {
    if (box !== undefined) {
        var deltaTimeInMillis = scene.getEngine().getDeltaTime();

        const rpm = 10;
        box.rotation.y += (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000);
    }
};


function MyHero() {
    return (
        <div className={styles.myHeroContainer}>
            <div className={styles.leftContainer}>
                <h3 className={styles.leftContainer_h1}>
                    你好，
                </h3>
                <p className={styles.leftContainer_p}>
                    欢迎来到黑星的小宇宙🪐
                </p>
                <div className={styles.buttonContainer}>
                    <div className={styles.svgContainer}>
                        {svgList.map((item, index) => {
                            return <Svg {...item} key={item.title}/>
                        })}
                    </div>
                </div>
            </div>
            <div className={styles.rightContainer}>
                <SceneComponent antialias onSceneReady={onSceneReady} onRender={onRender} id="my-canvas"/>
            </div>
        </div>
    )
}


export default function Home() {
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
