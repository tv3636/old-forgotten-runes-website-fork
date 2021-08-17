import Layout from "../components/Layout";
import ReactMarkdown from "react-markdown";
import { useState } from "react";
import gfm from "remark-gfm";
import styled from "@emotion/styled";
import dynamic from "next/dynamic";
import WizardPicker, {WizardConfiguration} from "../components/AddLore/WizardPicker"

const PickerStyle = styled.div`
  .wrapper {
  	height: 100%;
  	width: 100%;
  	background-color: #0e0e0e;
  	position: absolute;
  	display: flex;
  	flex-direction: column;
  	flex-wrap: nowrap;
  	align-content: center;
  	overflow: auto;
  }

  .outer-div {
  	max-width: 60%;
  	margin-bottom: 7em;
  }

  .header {
  	color: #ffff;
  	text-align: center;
  }
`;


const onWizardPicked = (wizardConfiguration: WizardConfiguration) => {
   console.log(wizardConfiguration);
  };

const MyWizards = () => (
  <Layout title="A Wizard Viewer for Forgotten Runes | Forgotten Runes Wizard's Cult: 10,000 on-chain Wizard NFTs">
    <PickerStyle>
      <div className="wrapper"><h2 className="header">My Wizards</h2><WizardPicker onWizardPicked={onWizardPicked} useModal={false}/></div>
    </PickerStyle>
  </Layout>
);

export default MyWizards;
