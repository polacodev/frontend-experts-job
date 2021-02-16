import React from 'react';
import { Header, Item, Input } from 'native-base';

import IconEJ from '../IconEJ/IconEJ';

import color from '../../config/color/color';

const HeaderEJ = ({ searchText, handlerSearch = () => ({}) }) => {
  return (
    <Header searchBar rounded style={{ backgroundColor: color.light_gray }}>
      <Item>
        <IconEJ iconName="search" color={color.dark_gray} />
        <Input
          placeholder="Search"
          value={searchText}
          onChangeText={(text) => handlerSearch(text)}
        />
        <IconEJ iconName="users" color={color.dark_gray} />
      </Item>
    </Header>
  );
};

export default HeaderEJ;
