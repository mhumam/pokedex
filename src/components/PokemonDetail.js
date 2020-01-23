import React from 'react';
import { NavBar, ActivityIndicator, Flex, List, Progress, Icon } from 'antd-mobile';
import { Redirect } from "react-router";
import 'antd-mobile/dist/antd-mobile.css';
import '../App.css';

var Pokedex = require('pokedex-promise-v2');
var P = new Pokedex();

const Item = List.Item;

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            id: null,
            name: null,
            height: null,
            weight: null,
            base_stats: [],
            back_page: false,
            flavor_text_entries: ''
        };
    }

    async componentDidMount() {
        const callaback = (response) => {
            const { id, height, weight, name, stats } = response;

            let base_stats = stats.map((obj) => {
                let result = {};
                result.base_stat = obj.base_stat;
                result.name = obj.stat.name;
                return result;
            })

            this.setState({ id, height, weight, name, base_stats });
        };

        let id = this.props.match.params.ID;
        this.setState({ isLoading: true });

        /* get detail general pokemon */
        await P.resource('https://pokeapi.co/api/v2/pokemon/' + id).then(function (response) {
            setTimeout(() => {
                callaback(response);
            }, 100);
        });


        /* get detail species pokemon */
        const callbackFlavor = (response) => {
            if (response.flavor_text_entries[1] && response.flavor_text_entries[1]['flavor_text']) {
                this.setState({ flavor_text_entries: response.flavor_text_entries[1]['flavor_text'] });
            }

            this.setState({ isLoading: false });
        }
        await P.resource('https://pokeapi.co/api/v2/pokemon-species/' + id).then(function (response) {
            setTimeout(() => {
                callbackFlavor(response);
            }, 100);
        });
    }

    render() {
        const { isLoading, id, height, weight, name, base_stats, back_page, flavor_text_entries } = this.state;
        //for back page true redirect to home
        if (back_page) { return (<Redirect to="/" />) }

        return (
            <React.Fragment>
                <NavBar mode="dark" icon={<Icon type="left" />} onLeftClick={() => this.setState({ back_page: true })}>Pokemon Detail</NavBar>
                <div className="flex-container">
                    <ActivityIndicator toast text="Loading..." animating={isLoading} />
                    <List renderHeader={() => 'My Pokemon Detail'} className="my-list">
                        <Item extra={'#' + id}>No</Item>
                        <Item extra={name}>Name</Item>
                    </List>

                    <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                        <div style={{ textAlign: 'center', fontWeight: 'bold' }}>Species</div>
                        <div style={{ borderRadius: '5px', padding: '10px', marginBottom: '10px', marginTop: '10px', backgroundColor: '#FFF' }}>
                            {flavor_text_entries}
                        </div>
                        <Flex style={{ textAlign: 'center' }}>
                            <Flex.Item>
                                <div style={{ border: '1px solid', borderRadius: '10px', padding: '5px', marginBottom: '5px' }}>
                                    2'4" ({height} m)
                            </div>
                            </Flex.Item>
                            <Flex.Item>
                                <div style={{ border: '1px solid', borderRadius: '10px', padding: '5px', marginBottom: '5px' }}>
                                    15.21 lbs ({weight} kg)
                            </div>
                            </Flex.Item>
                        </Flex>
                    </div>
                    <div style={{ textAlign: 'center', fontWeight: 'bold' }}>Base Stats</div>
                    <div style={{ borderRadius: '5px', padding: '5px', backgroundColor: '#FFF', margin: '10px 0' }}>
                        {
                            (base_stats.length > 0) ?
                                base_stats.map((obj) => {
                                    return <div className="show-info">
                                        <div className="label"> {obj.name}</div>
                                        <div className="progress" style={{ width: '80%' }}>
                                            <Progress percent={obj.base_stat} position="normal" appearTransition />
                                        </div>
                                        <div aria-hidden="true">{obj.base_stat}%</div>
                                    </div>
                                }) : null
                        }
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default App;