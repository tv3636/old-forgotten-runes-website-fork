import styled from "@emotion/styled";
import { useState } from "react";
import { Box } from "rebass";
import { WizardConfiguration } from "./AddLore/WizardPicker";
import { ResponsivePixelImg } from "./ResponsivePixelImg";

const image_base_url =
  "https://nftz.forgottenrunes.com/wizards/alt/400-nobg/wizard-";
const opensea_base_url =
  "https://opensea.io/assets/0x521f9c7505005cfa19a8e5786a9c3c9c9f5e6f42/";

const CardStyle = styled.div<{ isHovering: boolean }>`
  /* opacity: ${(props) => (props.isHovering ? 1 : 0.7)}; */
  transition: all 0.1s ease-in;
  max-width: 100%;
  position: relative;

  &:after {
    content: "";
    display: block;
    /* padding-bottom: 100%; */
  }
`;

const WizardFrame = styled.div`
  position: relative;
  background-image: url("/static/img/frame-alt.png");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const WizardImageContainer = styled.div`
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const WizardImage = styled.img`
  width: 100%;
  height: auto;
  image-rendering: pixelated;
  margin-top: 23%;
  margin-bottom: 13%;
`;

const WizardName = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  h3 {
    text-align: center;
    position: relative;
    line-height: 1em;

    font-size: 1em;
    padding: 0 30%;
    color: #dfd1a8;
    font-family: "Alagard";
    position: absolute;
    margin-top: 30%;
  }
`;

const Links = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const WizardCard = ({
  id,
  name,
  onWizardPicked,
  showOpenSeaLink = false,
  showLoreLink = false,
}: {
  id: string;
  name: string;
  onWizardPicked?: (wizardConfiguration: WizardConfiguration) => void;
  showOpenSeaLink?: boolean;
  showLoreLink?: boolean;
}) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <CardStyle
      isHovering={isHovering}
      onMouseOver={() => setIsHovering(true)}
      onMouseOut={() => setIsHovering(false)}
    >
      <WizardFrame
        onClick={
          onWizardPicked
            ? () => {
                const wizardPicked: WizardConfiguration = {
                  tokenId: id,
                  name: name
                };
                console.log("wizardPicked: ", wizardPicked);
                onWizardPicked(wizardPicked);
              }
            : () => null
        }
      >
        <WizardName>
          <h3>
            {name} (#{id})
          </h3>
        </WizardName>
        <WizardImageContainer>
          <WizardImage src={image_base_url + id + ".png"} />
        </WizardImageContainer>
      </WizardFrame>
      <Links>
        {showOpenSeaLink ? (
              <>
                <a
                  href={`${opensea_base_url}${id}`}
                  target={"_blank"}
                  className="icon-link"
                  title={"OpenSea"}
                >
                  <ResponsivePixelImg src="/static/img/icons/social_opensea_default_w.png" />
                </a>
              </>
            ) : null}
            <Box ml={3} />
            {showLoreLink ? (
              <>
                <a
                  href={`/lore/${id}/0`}
                  className="icon-link"
                  title={"Lore"}
                  target={"_blank"}
                >
                  <ResponsivePixelImg src="/static/img/icons/social_link_default.png" />
                </a>
              </>
            ) : null}
        </Links>
    </CardStyle>
  );
};

export default WizardCard;
