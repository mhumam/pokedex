import React from 'react';
import { Flex, Grid, Badge, WhiteSpace, Result, Button } from 'antd-mobile';
import {
    Link
} from "react-router-dom";
import { connect } from "react-redux";

const myImg = src => <img src={src} className="spe am-icon am-icon-md" alt="" />;
class PokemonList extends React.Component {
    render() {
        const { myPokemonList } = this.props;
        if (myPokemonList.length > 0) {
            return (
                <div>
                    <Grid data={myPokemonList}
                        columnNum={2}
                        activeStyle={false}
                        renderItem={dataItem => (<PokemonCard dataItem={dataItem} key={dataItem.key} />)} itemStyle={{ minHeight: '250px' }} />
                </div>
            );
        } else {
            return (
                <Result
                    img={myImg('https://image.flaticon.com/icons/svg/1380/1380641.svg')}
                    title="Not Found"
                    message={<div>Pokemon Not Found</div>}
                />
            )
        }
    }
}

class PokemonCard extends React.Component {
    render() {
        const { dataItem } = this.props;
        return (
            <div style={{ padding: '12.5px' }} key={dataItem.key}>
                <img src={dataItem.images} style={{ width: '100px', height: '100px' }} alt="" />
                <div style={{ color: '#888', fontSize: '14px' }}>
                    <span>
                        #{dataItem.id} {dataItem.name}
                        <WhiteSpace />
                        {
                            dataItem.types.map((value) => {
                                return <Badge key={value} text={value} style={{ marginLeft: 12, backgroundColor: '#21b68a' }} />
                            })
                        }
                    </span>
                    <Flex>
                        <Flex.Item style={{ padding: '5px' }}>
                            <Link to={"/detail/" + dataItem.id}>
                                <Button size="small" type="default" style={{ marginTop: '10px' }}>Detail</Button>
                            </Link>
                        </Flex.Item>
                    </Flex>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    ...state
});
const mapDispatchToProps = dispatch => ({
});
export default connect(mapStateToProps, mapDispatchToProps)(PokemonList);