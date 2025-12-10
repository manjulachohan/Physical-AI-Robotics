import React from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Physical AI Focus',
    Svg: require('@site/static/img/ai-icon.svg').default,
    description: (
      <>
        Comprehensive coverage of Physical AI principles, combining artificial intelligence 
        with physical embodiment to create systems that interact meaningfully with the real world.
      </>
    ),
  },
  {
    title: 'Humanoid Robotics',
    Svg: require('@site/static/img/robot-icon.svg').default,
    description: (
      <>
        In-depth exploration of humanoid robotics engineering, including locomotion, 
        balance, manipulation, and perception systems tailored for bipedal robots.
      </>
    ),
  },
  {
    title: 'Practical Applications',
    Svg: require('@site/static/img/application-icon.svg').default,
    description: (
      <>
        Real-world applications of Physical AI across industries, from healthcare and 
        manufacturing to domestic assistance and research exploration.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        {Svg ? <Svg className={styles.featureSvg} role="img" /> : null}
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}