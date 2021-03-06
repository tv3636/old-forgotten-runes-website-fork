import Layout from "../components/Layout";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import styled from "@emotion/styled";

// TODO: let's move this to mdx
const document = `
# Welcome to the Cult

## The Wizard's Summary

There are 10,000 unique Wizard NFTs. The Summoning began on [Ethereum block 12736300](https://etherscan.io/block/countdown/12736300), which was approximately Jun 30th 2021. The Wizards are encoded fully on-chain.

The image of each Wizard is 50x50 pixels, scaled to 400x400. Each Wizard has a unique name and configuration of traits.

Each wizard was summoned for 0.07 ETH, with a maximum of 12 summoned per transaction.

You can [summon wizards on the website here](https://forgottenrunes.com).

## Provenance: Encoded Fully On-Chain

Most NFT projects merely store their images on IPFS, and the owners of such NFTs only hold a pointer to that image. Not so with us.

Our Wizards are fully encoded on-chain. The provenance of the Wizard images and data are recorded wholly within the Ethereum blockchain, attached to our [custom contract](https://etherscan.io/address/0x521f9c7505005cfa19a8e5786a9c3c9c9f5e6f42). Which means ownership of a Wizard, and the image itself, is fully on-chain.

This on-chain provenance puts Wizards in a small cohort of on-chain NFTs including [0xmons](https://0xmons.xyz/) and [Mooncats](https://mooncatrescue.com/).

In short, your Wizard is 100% decentralized and will live forever on the Ethereum blockchain.

## The Team

The Team is [ElfJTrul](https://twitter.com/ElfJTrul) and [Dotta](https://twitter.com/cryppadotta).

Elf is a Los Angeles, California-based Artist. He has worked in the entertainment industry for over a decade with the studios such as Disney and Nickelodeon.

Dotta deployed one of the earliest ERC721 contracts, [Dotlicence](https://etherscan.io/address/0xb5da84cdc928765c15a8192bf3c6649e7802772b), in April 2018.

Both the art and code were created by us.

## Roadmap

![](/static/img/roadmap-v3.jpg)

### 2222 Wizards - OpenSea

The full attributes (traits) are enabled on OpenSea.

### 3333 Wizards - Poems

3 custom poems are written for 3 Wizard owners

### 4444 Wizards - Airdrop

4 Wizards are airdropped to 4 lucky winners

### 5555 Wizards - 3D Models

We build a 3D model of their Wizard for 3 owners

### 6666 Wizards - Commercial Rights

We sacrifice our Souls to a Jelly Donut - Commercial rights are granted to NFT owners

### 7777 Wizards - Repentance

We repent for the above

### 8888 Wizards - Forgotten Souls

Devs begin the production of a limited burn mechanism: Forgotten Souls.

### 9999 Wizards - Warrior's Guild

All wizards are summoned. Devs begin production of limited companion project: Forgotten Runes Warrior's Guild. (Wizard holders receive early-access whitelisting.)

# Q: Tell me more about on-chain encoding?

Unlike most other NFT projects, Forgotten Rune's Wizards are fully encoded on-chain. This means that they do not depend on any external or centralized hosting service to exist.

We do not wish to leak the attributes of the Wizards before the Summoning has started, therefore, the Decoding Ring (script) for generating the Wizards from on-chain data will be released on Github 96 hours after The Summoning has begun.

The technical among you might notice that we do host a mirror of our images and data on IPFS and centralized services. This is only a mirror and is for convenience of tools like OpenSea and not requirement for the provenance or persistence of the Wizards.

# Q: Tell me more about the commercial rights?

When milestone 6,666 is reached, Forgotten Runes grants Wizard NFT owners commercial rights to the image in their NFT. That said, commercial rights are an involved, nuanced, and even regional topic and we will outline more the specifics of these rights in July 2021.

# Q: How can I qualify for the Roadmap drops above?

You must 1. be a Wizard holder 2. Be in our Discord 3. Respond to the instructions in our Discord 4. within an appropriate timeframe.

# Tokenomics and Incentivized Wizards

There are 10,000 unique Wizards.

The first 80 were minted directly by the team. From of those 80, about 30 were given away for free for marketing and friends and the remaining 50 will be transferred to the team.

The secondary market royalties are set at 2.5%.

# Special Thanks

We'd like to offer our thanks to our beta testers and folks who gave us feedback early in the project. We especially want to thank [Owen (0xmons)](https://twitter.com/0xmons) for his guidance and technical feedback on the project.

# Resources

- [Forgotten Runes Minting Website](https://forgottenrunes.com)
- [OpenSea](https://opensea.io/collection/forgottenruneswizardscult)
- [Twitter](https://twitter.com/forgottenrunes)
- [Discord](https://discord.com/invite/F7WbxwJuZC)
- [Forgotten Runes Contract on Etherscan](https://etherscan.io/address/0x521f9c7505005cfa19a8e5786a9c3c9c9f5e6f42)
`;

const AboutWrapper = styled.div`
  padding: 2em 2em;
  color: rgb(172 167 185);

  display: flex;
  justify-content: center;

  a {
    color: #a983ff;
  }

  h1,
  h2,
  h3,
  h4,
  h5 {
    font-family: "Alagard", system-ui, -apple-system, "Segoe UI", Roboto,
      Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
  }
  h1 {
    margin-top: 1.5em;
  }
  h2 {
    margin-top: 1.3em;
  }
  h3 {
    margin-top: 1em;
  }

  .content {
    max-width: 800px;
    line-height: 1.4em;
    p {
      line-height: 1.6em;
    }
  }

  p img {
    margin: 0 auto;
    width: 100%;
  }
`;

const ResponsiveImg = styled.img`
  width: 100%;
  height: auto;
  image-rendering: pixelated;
`;

const AboutPage = () => (
  <Layout title="wtf | Forgotten Runes Wizard's Cult: 10,000 on-chain Wizard NFTs">
    <ResponsiveImg src="/static/img/header.png" />
    <AboutWrapper>
      <div className="content">
        <ReactMarkdown remarkPlugins={[gfm]} children={document} />
      </div>
    </AboutWrapper>
  </Layout>
);

export default AboutPage;
