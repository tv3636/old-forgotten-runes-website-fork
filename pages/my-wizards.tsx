import Layout from "../components/Layout";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import styled from "@emotion/styled";
import dynamic from "next/dynamic";
import WizardPicker from "../components/AddLore/WizardPicker"

const PickerStyle = styled.div`
  .wrapper {
  	height: 100%;
  	width: 100%;
  	background-color: #000000;
  	position: absolute;
  }
`;

const MyWizards = () => (
  <Layout title="A Wizard Viewer for Forgotten Runes | Forgotten Runes Wizard's Cult: 10,000 on-chain Wizard NFTs">
    <PickerStyle>
      <div className="wrapper"><WizardPicker /></div>
    </PickerStyle>
  </Layout>
);

export default MyWizards;
