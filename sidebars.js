// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  textbookSidebar: [
    'front-page',
    {
      type: 'category',
      label: 'Part I: Foundations of Physical AI',
      items: [
        'part-i/introduction-to-physical-ai',
        'part-i/robotics-fundamentals',
      ],
    },
    {
      type: 'category',
      label: 'Part II: Humanoid Robotics Engineering',
      items: [
        'part-ii/humanoid-architecture',
        'part-ii/locomotion-and-balance',
      ],
    },
    {
      type: 'category',
      label: 'Part III: Intelligence Layer for Humanoids',
      items: [
        'part-iii/natural-language-for-humanoids',
      ],
    },
    {
      type: 'category',
      label: 'Part IV: Building Physical AI Systems',
      items: [
        'part-iv/ros2',
      ],
    },
    {
      type: 'category',
      label: 'Part V: Future of Physical AI',
      items: [
        'part-v/applications',
      ],
    },
    {
      type: 'category',
      label: 'Part VI: Computer Vision for Physical AI',
      items: [
        'part-vi/computer-vision',
      ],
    },
    {
      type: 'category',
      label: 'Part VII: Machine Learning for Physical AI',
      items: [
        'part-vii/machine-learning',
      ],
    },
    {
      type: 'category',
      label: 'Part VIII: Motion Planning and Control',
      items: [
        'part-viii/motion-planning',
      ],
    },
    {
      type: 'category',
      label: 'Part IX: Human-Robot Interaction',
      items: [
        'part-ix/human-robot-interaction',
      ],
    },
    {
      type: 'category',
      label: 'Part X: Advanced Topics and Future Directions',
      items: [
        'part-x/further-topics',
      ],
    },
  ],
};

export default sidebars;