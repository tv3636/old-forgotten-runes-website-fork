import Layout from "../components/Layout";
import styled from "@emotion/styled";
import WizardPicker, {WizardConfiguration} from "../components/AddLore/WizardPicker"

const PickerStyle = styled.div`
  	height: 100%;
  	width: 100%;
  	background-color: #0e0e0e;
  	position: absolute;
  	display: flex;
  	flex-direction: column;
  	flex-wrap: nowrap;
  	align-content: center;
  	overflow: auto;
`;

const WizardHeader = styled.header`
  	color: #ffff;
  	text-align: center;
  	font-family: "Alagard";

  	margin: 1em;
  	font-size: 2em;
`;

const WizardView = styled.div`
	margin-left: 25%;
	margin-right: 25%;
`;

const onWizardPicked = (wizardConfiguration: WizardConfiguration) => {
   console.log(wizardConfiguration);
  };

const MyWizards = () => (
  <Layout title="A Wizard Viewer for Forgotten Runes | Forgotten Runes Wizard's Cult: 10,000 on-chain Wizard NFTs">
    <PickerStyle>
		<WizardHeader>My Wizards</WizardHeader>
		<WizardView>
			<WizardPicker onWizardPicked={onWizardPicked} useModal={false}/>
		</WizardView>
    </PickerStyle>
  </Layout>
);

export default MyWizards;
