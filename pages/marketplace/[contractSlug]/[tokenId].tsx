import styled from "@emotion/styled";
import { GetStaticPaths, GetStaticProps } from "next";
import Layout from "../../../components/Layout";
import React, { useEffect, useState } from "react";
import client from "../../../lib/graphql";
import { gql } from "@apollo/client";
import { hydratePageDataFromMetadata } from "../../../components/Lore/markdownUtils";
import IndividualLorePage from "../../../components/Lore/IndividualLorePage";
import { SocialItem } from "../../../components/Lore/BookOfLoreControls";
import { ResponsivePixelImg } from "../../../components/ResponsivePixelImg";

const API_BASE_URL: string = "https://indexer-v31-mainnet.up.railway.app/";

const IMG_URLS: any = {
  "0x521f9c7505005cfa19a8e5786a9c3c9c9f5e6f42": "/api/art/wizards/",
  "0x251b5f14a825c537ff788604ea1b58e49b70726f":
    "https://portal.forgottenrunes.com/api/souls/img/",
  "0xf55b615b479482440135ebf1b907fd4c37ed9420":
    "https://portal.forgottenrunes.com/api/shadowfax/img/",
};

const COLLECTION_NAMES: any = {
  "0x521f9c7505005cfa19a8e5786a9c3c9c9f5e6f42": "wizards",
  "0x251b5f14a825c537ff788604ea1b58e49b70726f": "souls",
  "0xf55b615b479482440135ebf1b907fd4c37ed9420": "ponies",
};

const MarketText = styled.p`
  font-family: Alagard;
  font-size: 32px;
  color: white;

  margin: 15px;
`;

const MarketButton = styled.button`
  font-family: Alagard;
  font-size: 32px;
  color: black;

  margin: 5px;
`;

const MarketHeader2 = styled.h2`
  font-family: Alagard;
  font-size: 40px;
  color: white;

  margin-top: 12px;
  margin-bottom: 30px;
`;

const MarketHeader4 = styled.h4`
  font-family: Arial;
  font-size: 18px;
  color: white;

  margin-top: 12px;
`;

const TraitRow = styled.div`
  text-align: start;
  margin-left: 1vw;
  margin-right: 1vw;
  font-size: 18px;
  font-family: Alagard;
`;

const Frame = styled.div`
  background-image: url("/static/game/wizards/frame_traits.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;

  display: flex;
  justify-content: center;
`;

function TraitDisplay({ attributes }: { attributes: [] }) {
  if (attributes.length == 0) {
    return null;
  } else {
    return (
      <Frame>
        <div style={{ marginTop: "50px", marginBottom: "50px", width: "93%" }}>
          {attributes.map((attribute: any, index: number) => (
            <div key={index}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  height: "40px",
                  alignItems: "center",
                }}
              >
                <TraitRow>{attribute.key}:</TraitRow>
                <TraitRow>{attribute.value}</TraitRow>
              </div>
              {index < attributes.length - 1 ? <hr /> : null}
            </div>
          ))}
        </div>
      </Frame>
    );
  }
}

function Icons({
  tokenId,
  collection,
}: {
  tokenId: number;
  collection: string;
}) {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <SocialItem>
        <a
          href={`/scenes/gm/${tokenId}`}
          className="icon-link gm"
          target="_blank"
        >
          <ResponsivePixelImg
            src="/static/img/icons/gm.png"
            className="gm-img"
          />
        </a>
      </SocialItem>
      {COLLECTION_NAMES[collection] == "wizards" && (
        <SocialItem>
          <a
            href={`/api/art/${COLLECTION_NAMES[collection]}/${tokenId}.zip`}
            className="icon-link"
            target="_blank"
          >
            <ResponsivePixelImg src="/static/img/icons/social_download_default_w.png" />
          </a>
        </SocialItem>
      )}
      <SocialItem>
        <a
          href={`/lore/${COLLECTION_NAMES[collection]}/${tokenId}/0`}
          className="icon-link"
        >
          <ResponsivePixelImg src="/static/img/icons/social_link_default.png" />
        </a>
      </SocialItem>
    </div>
  );
}

const ListingPage = ({
  contractSlug,
  tokenId,
  lore,
}: {
  contractSlug: string;
  tokenId: string;
  lore: any;
}) => {
  const [token, setToken] = useState<any>({});
  const [listing, setListing] = useState<any>({});
  const [attributes, setAttributes] = useState<any>([]);
  const [pages, setPages] = useState<any>([]);

  useEffect(() => {
    async function run() {
      const page = await fetch(
        API_BASE_URL +
          "tokens/details?" +
          "contract=" +
          contractSlug +
          "&tokenId=" +
          tokenId
      );
      const listingsJson = await page.json();

      if (listingsJson.tokens.length > 0) {
        setToken(listingsJson.tokens[0].token);
        setListing(listingsJson.tokens[0].market.floorSell);
        setAttributes(listingsJson.tokens[0].token.attributes);
      }

      if (lore.length > 0) {
        var newPages = [];
        for (var lorePage of lore) {
          var thisPage = await hydratePageDataFromMetadata(
            lorePage.loreMetadataURI,
            lorePage.createdAtTimestamp,
            lorePage.creator,
            lorePage.tokenId
          );

          newPages.push(thisPage);
        }
        setPages(newPages);
      }
    }

    run();
  }, []);

  return (
    <Layout title={token.name}>
      {Object.keys(listing).length > 0 && (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            margin: "4vh",
          }}
        >
          <div
            id="lefthand"
            style={{ textAlign: "center", marginRight: "5vw" }}
          >
            <img src={IMG_URLS[contractSlug] + tokenId + ".png"} />
            <Icons tokenId={Number(tokenId)} collection={contractSlug} />
            <div
              style={{
                textAlign: "center",
                marginTop: "1vh",
              }}
            >
              <TraitDisplay attributes={attributes} />
            </div>
          </div>
          <div
            id="righthand"
            style={{
              textAlign: "center",
              marginLeft: "3vw",
              marginTop: "6vh",
            }}
          >
            <MarketHeader2>{token.name}</MarketHeader2>
            <MarketText>
              {listing.value ? listing.value + " Ξ" : null}
            </MarketText>
            <hr />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {listing.value && <MarketButton>Buy Now</MarketButton>}
              <MarketButton>Make Offer</MarketButton>
            </div>
            <hr />
            {token.owner && (
              <MarketHeader4>
                {"Owner: "}
                <a
                  href={"/address/" + token.owner}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {token.owner.substring(0, 10)}
                </a>
              </MarketHeader4>
            )}
            <p>
              {listing.validUntil
                ? "Listing expires " +
                  String(
                    new Date(listing.validUntil * 1000).toLocaleDateString()
                  )
                : null}
            </p>
            <div
              style={{
                marginTop: "8vh",
                maxWidth: "75%",
                display: "inline-flex",
                flexDirection: "column",
              }}
            >
              {pages.length > 0 ? (
                pages.map((page: any, index: number) => (
                  <div key={index}>
                    <IndividualLorePage
                      bgColor={page.bgColor}
                      story={page.story}
                    />
                  </div>
                ))
              ) : (
                <div>No Lore has been recorded...</div>
              )}
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default ListingPage;

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const contractSlug = params?.contractSlug as string;
  const tokenId = params?.tokenId as string;

  try {
    const { data } = await client.query({
      query: gql`
        query WizardLore {
            loreTokens(first: 999, orderBy: tokenId, orderDirection: asc, where: {tokenContract: "${contractSlug}", tokenId: "${tokenId}"}) {
                lore(
                    where: { struck: false, nsfw: false }
                    orderBy: id
                    orderDirection: asc
                ) {
                    id
                    index
                    creator
                    tokenContract
                    loreMetadataURI
                    tokenId
                    struck
                    nsfw
                    createdAtTimestamp
                }
            }
        }`,
    });

    var results = data["loreTokens"][0]["lore"];
  } catch (e) {
    console.error("Couldn't fetch lore. Continuing anyway as its non-fatal...");
    results = [];
  }

  return {
    props: {
      contractSlug,
      tokenId: tokenId,
      lore: results,
    },
    revalidate: 3 * 60,
  };
};

export const getStaticPaths: GetStaticPaths = async ({}) => {
  return {
    paths: [],
    fallback: "blocking",
  };
};
