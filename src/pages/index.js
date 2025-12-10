import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/part-i/introduction-to-physical-ai">
            Read the Textbook - 60 min ⏱️
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Home`}
      description="A comprehensive guide to Physical AI, Humanoid Robotics, and Intelligent Systems">
      <HomepageHeader />
      <main>
        <section className={styles.bookVisualization}>
          <div className="container">
            <div className="row">
              <div className="col col--6 col--offset-3">
                <div className={styles.openBook}>
                  <div className={styles.bookCover}>
                    <h3>{siteConfig.title}</h3>
                    <p>{siteConfig.tagline}</p>
                  </div>
                  <div className={styles.bookPages}>
                    <div className={styles.page}>
                      <h4>Part I: Foundations of Physical AI</h4>
                      <ul>
                        <li>Introduction to Physical AI</li>
                        <li>Robotics Fundamentals</li>
                        <li>Computer Vision for Physical AI</li>
                      </ul>
                    </div>
                    <div className={styles.page}>
                      <h4>Part II: Humanoid Robotics Engineering</h4>
                      <ul>
                        <li>Humanoid Architecture</li>
                        <li>Locomotion and Balance</li>
                        <li>Manipulation</li>
                      </ul>
                    </div>
                    <div className={styles.page}>
                      <h4>Part III: Intelligence Layer for Humanoids</h4>
                      <ul>
                        <li>Natural Language for Humanoids</li>
                        <li>Cognitive AI Models</li>
                      </ul>
                    </div>
                    <div className={styles.page}>
                      <h4>Part IV: Building Physical AI Systems</h4>
                      <ul>
                        <li>ROS 2 Framework</li>
                        <li>Embedded Systems</li>
                      </ul>
                    </div>
                    <div className={styles.page}>
                      <h4>Part V: Future of Physical AI</h4>
                      <ul>
                        <li>Applications</li>
                        <li>Ethics and Safety</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <HomepageFeatures />
      </main>
    </Layout>
  );
}