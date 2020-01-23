import React from 'react';
import { Link } from "react-router-dom";
import { ActivityIndicator, Grid, Button, Badge, WhiteSpace, Pagination, Flex, Modal, Toast } from 'antd-mobile';
import { connect } from "react-redux";
import { catch_pokemon } from '../redux/Actions';

var Pokedex = require('pokedex-promise-v2');
var P = new Pokedex();

const locale = { prevText: 'Prev', nextText: 'Next' };
const prompt = Modal.prompt;

class PokemonList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      List: [],
      limit: 6,
      totalData: 1,
      offset: 1,
      isLoading: true
    }
  }

  componentDidMount() {
    this.getList();
  }

  /* call service getPokemonsList */
  getList() {
    /* callback response service getPokemonsList */
    const callaback = async (response) => {
      const { count, results } = response;
      const { limit } = this.state;

      let totalData = Math.ceil(count / limit);
      let List = results;

      for (const field in List) {
        let url = List[field]['url'];
        await P.resource(url).then(function (responseDetail) {
          let { id, types, sprites } = responseDetail;

          List[field]['types'] = types.map((obj, key) => { return obj['type']['name']; });
          List[field]['images'] = sprites.front_default;
          List[field]['id'] = id;
        });
      }
      this.setState({ List, totalData, isLoading: false });
    }

    let limit = (this.state.limit - 1);
    let offset = this.state.offset * this.state.limit;
    var interval = { limit, offset };

    /* give loading in page */
    this.setState({ isLoading: true });
    P.getPokemonsList(interval).then(function (response) {
      setTimeout(() => {
        callaback(response);
      }, 100);
    });
  }

  /* handle change page */
  handleOnChange = async (offset) => {
    await this.setState({ offset });
    await this.getList();
  }

  render() {
    const { List, offset, totalData, isLoading } = this.state;
    return (
      <div>
        <ActivityIndicator toast text="Loading..." animating={isLoading} />
        <Grid data={List}
          columnNum={2}
          activeStyle={false}
          renderItem={dataItem => (<PokemonCard {...this.props} dataItem={dataItem} key={dataItem.key} />)} itemStyle={{ minHeight: '250px' }} />
        <Pagination total={totalData} current={offset} locale={locale} onChange={(e) => this.handleOnChange(e)} />
      </div>
    );
  }
}


class PokemonCard extends React.Component {
  handleCatch = (name, dataItem) => {
    // e.preventDefault();
    let pokemon = { ...dataItem, name };
    this.props.catch_pokemon(pokemon);

    Toast.success('Load success !!!', 1);
  }

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
              <Button size="small" type="primary" style={{ marginTop: '10px' }}
                // onClick={(e) => this.handleCatch(e, dataItem.id)}
                onClick={() =>
                  prompt('Pokemon Name', 'Please fill in the Pokemon name', [
                    { text: 'Cancel' },
                    {
                      text: 'Submit',
                      onPress: value => this.handleCatch(value, dataItem)
                    },
                  ], 'default', 'My Pokemon')}
              >Catch</Button>
            </Flex.Item>
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

// export default PokemonList;


const mapStateToProps = state => ({
  ...state
});
const mapDispatchToProps = dispatch => ({
  catch_pokemon: (data) => dispatch(catch_pokemon(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(PokemonList);