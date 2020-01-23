import React from 'react';
import { TabBar } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import '../App.css';
import PokemonList from '../components/PokemonList';
import MyPokemon from '../components/MyPokemon';
import { connect } from "react-redux";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedTab: 'List',
			hidden: false,
			fullScreen: true,
			myPokemonList: []
		};
	}

	renderContent(pageText) {
		return (
			<div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
				{
					(pageText === 'List') ? <PokemonList /> : <MyPokemon />
				}
			</div>
		);
	}

	render() {
		return (
			<div style={this.state.fullScreen ? { position: 'fixed', height: '100%', width: '100%', top: 0 } : { height: 400 }}>
				<TabBar unselectedTintColor="#949494" tintColor="#33A3F4" barTintColor="white" hidden={this.state.hidden}>
					<TabBar.Item
						title="Home"
						key="Home"
						icon={<div style={{
							width: '22px', height: '22px',
							background: 'url(https://image.flaticon.com/icons/svg/149/149412.svg) center center /  21px 21px no-repeat'
						}}
						/>
						}
						selectedIcon={<div style={{
							width: '22px', height: '22px',
							background: 'url(https://image.flaticon.com/icons/svg/660/660701.svg) center center /  21px 21px no-repeat'
						}}
						/>
						}
						selected={this.state.selectedTab === 'blueTab'}
						onPress={() => {
							this.setState({
								selectedTab: 'blueTab',
							});
						}}
						data-seed="logId"
					>
						{this.renderContent('List')}
					</TabBar.Item>
					<TabBar.Item
						icon={
							<div style={{
								width: '22px', height: '22px',
								background: 'url(https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg) center center /  21px 21px no-repeat'
							}}
							/>
						}
						selectedIcon={
							<div style={{
								width: '22px', height: '22px',
								background: 'url(https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg) center center /  21px 21px no-repeat'
							}}
							/>
						}
						title="My Pokemon List"
						key="My Pokemon List"
						badge={(this.props.myPokemonList.length > 0) ? this.props.myPokemonList.length : null}
						selected={this.state.selectedTab === 'redTab'}
						onPress={() => {
							this.setState({
								selectedTab: 'redTab',
							});
						}}
						data-seed="logId1"
					>
						{this.renderContent('Koubei')}
					</TabBar.Item>
				</TabBar>
			</div>
		);
	}
}


const mapStateToProps = state => ({
	...state
});
const mapDispatchToProps = dispatch => ({});
export default connect(mapStateToProps, mapDispatchToProps)(App);