import React, { useRef, useEffect } from 'react';
import { Column, Row, SubHeadline, Paragraph, Link, Headline, List, ListItem, AnimateNumber } from 'cross-country';
import brandon from './brandon_square.png';
import { useTransition, animated, useSpringRef, useSpring } from '@react-spring/web';

import Image from 'next/image';

import Bolt from './bolt';
import { LinkedinLogo, GithubLogo, TwitterLogo, X } from 'phosphor-react';

const moss = '#bccd9d';
const gold = '#b2a25a';
const teal = '#0baeae';

const HeadwindsSidequest = ({ isLoading = false }) => {

  const wrapperRef = useRef();

  const customLinkStyle = {
    textDecoration: 'none',
    boxShadow: 'none',
    borderBottom: 'none',
    alignItems: 'center',
    display: 'flex',
  };

  const customParagraphStyle = {
    marginLeft: 8,
    color: gold,
  };

  const paraStyle = { lineHeight: 1.5 };

  const todayNum = 5;

  const [springs, api] = useSpring(() => ({
    from: { opacity: 0 },
  }))


  useEffect(() => {
    if (wrapperRef.current) {
      api.start({
        from: {
          opacity: 0,
        },
        to: {
          opacity: 100,
        },
      })
    }
  });

  return (
    <animated.div ref={wrapperRef} style={{ opacity: 0, maxWidth: 600, ...springs }}>
      <Column>
        <Row>
          <Column customStyle={{ padding: 0 }}>
            {/*<Image a11y="brandon flowers" url={brandon} width={100} height={100} customStyle={{ borderRadius: '50%' }} />*/}
            <Image src="/brandon_square.png" alt="Brandon Flowers" width={100} height={100} style={{ borderRadius: '50%' }} />
            <Headline>
              <Bolt />
              Brandon Flowers
            </Headline>
          </Column>

          {/*
        <Row>
        <Paragraph>Days Unemployed</Paragraph>
        <AnimateNumber delay="1000" to={todayNum} from={0} customStyle={{color: "#b2a25a"}} />
        </Row>*/}

        </Row>
        <Paragraph customStyle={paraStyle}>
          I{"'"}m currently seeking the opportunity to make a major impact at a new company! Whether you need a mix of Full-stack or 100% Frontend, I can help you and your team build web applications as both mentor and lead contributor. I 💛 solving complex customer journeys, workflows, and crafting executive dashboards rich with metrics and data visualisations. Learn more about me on my    <Link url="https://www.linkedin.com/in/brandonflowers">Linkedin</Link> and <Link url="https://github.com/headwinds/">Github</Link>.
        </Paragraph>
        <SubHeadline
          color={gold}
          customStyle={{
            backgroundColor: 'whitesmoke',
            padding: 8,
            fontWeight: 300,
          }}
        >
          As a passionate dev, I also write about Data Visualization, DIY APIs, State Machines & leveraging Natural
          Language Processing.
        </SubHeadline>
        <Paragraph customStyle={paraStyle}>Ever since the death of Google Reader 💀, I've been exploring RSS in a personal project called <Link url="https://golds.vercel.app/">Golds</Link> as part of a goal setting and media research study where I'm tracking trends across over 50 feeds covering design, technology, architecture, gaming and sports. <Link url="https://chromewebstore.google.com/detail/porthole/dilfffpckfhcpgidnmgaeoidgekcjlln?pli=1">Porthole</Link> is a chrome-extension version, and I also have an unreleased React-native app in the works.
        </Paragraph>
        <Paragraph customStyle={paraStyle}>
          My site is a "build in public" experiment where I{"'"}m feauturing my own component library{' '}
          <Link url="https://www.npmjs.com/package/cross-country">Cross Country</Link> and writing my own Backend 
          services in <Link url="https://github.com/headwinds/python-notebooks/">Python</Link>,{' '}
          <Link url="https://github.com/headwinds/cabinquest">Node</Link>,{' '}and{' '}
          <Link url="https://github.com/headwinds/northwind-frostpunk/">Go</Link> against a <Link url="https://twitter.com/headwinds/status/1588225965959815168">PostgreSQL</Link>{' '} database.
        </Paragraph>
        <Paragraph customStyle={{ marginBottom: 16, lineHeight: 1.5 }}>

        </Paragraph>
        <List customStyle={{ listStyleType: 'none' }}>
          <ListItem>
            <Link url="https://www.linkedin.com/in/branonflowers" customStyle={customLinkStyle}>
              <LinkedinLogo size={32} color={gold} weight="light" />
              <Paragraph customStyle={customParagraphStyle}>Linkedin</Paragraph>
            </Link>
          </ListItem>
          <ListItem>
            <Link url="https://www.github.com/headwinds" customStyle={customLinkStyle}>
              <GithubLogo size={32} color={gold} weight="light" />
              <Paragraph customStyle={customParagraphStyle}>Github</Paragraph>
            </Link>
          </ListItem>
          <ListItem>
            <Link url="https://www.twitter.com/headwinds" customStyle={customLinkStyle}>
              <TwitterLogo size={32} color={gold} weight="light" />
              <Paragraph customStyle={customParagraphStyle}>Twitter</Paragraph>
            </Link>
          </ListItem>
        </List>
      </Column>
    </animated.div>
  );
};
export default HeadwindsSidequest;