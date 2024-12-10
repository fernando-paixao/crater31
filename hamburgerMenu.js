const { useState } = React;

const MenuItem = ({ item, onItemSelected }) => {
  const [childrenVisible, setChildrenVisible] = React.useState(false);

  const hasChildren = item.children && item.children.length > 0;
  const hasContent = item._contentIndex != undefined;

  const toggleChildren = (e) => {
    e.stopPropagation();
    if (hasChildren) {
      setChildrenVisible(!childrenVisible);
      if(hasContent) {
        onItemSelected(item, false);  
      }
    } else {
      onItemSelected(item);
    }
  };

  let className = 'menu-item';
  if(item._contentIndex != undefined) {
    className += ' menu-item-with-content';
  }

  return React.createElement(
    'li',
    null,
    React.createElement(
      'div',
      { className: className, onClick: toggleChildren },
      React.createElement('span', null, item.label),  //+'</a>'+item._contentIndex
      hasChildren && //hasChildren  //(item._contentIndex == undefined)
        React.createElement(
          'button',
          { className: 'toggle-button' },
          childrenVisible ? '-' : '+'
        )
    ),
    childrenVisible &&
      hasChildren &&
      React.createElement(
        'ul',
        null,
        item.children.map((child) =>
          React.createElement(MenuItem, {
            key: child.id,
            item: child,
            onItemSelected,
          })
        )
      )
  );
};

const HamburgerMenu = (props) => {
//  items
//itemSelectedHandler
  const menuItems = Object.values(props.items);  //Object.entries
  //console.log(menuItems, typeof(menuItems), menuItems.map);
  const [menuVisible, setMenuVisible] = React.useState(false);

  const toggleMenu = () => setMenuVisible(!menuVisible);

  const handleItemSelected = (item, closeMenu) => {
    //alert(`You selected: ${item.label}`);
    props.itemSelectedHandler(item);
    if(closeMenu != false) {
      setMenuVisible(false);
    }
  };

  return React.createElement(
    'div',
    null,
    React.createElement(
      'button',
      { className: 'hamburger', onClick: toggleMenu },
      '☰'
    ),
    menuVisible &&
      React.createElement(
        'div',
        { className: 'menu' },
        React.createElement(
          'ul',
          null,
          menuItems.map((item) =>
            React.createElement(MenuItem, {
              key: item.id,
              item,
              onItemSelected: handleItemSelected,
            })
          )
        )
      )
  );
};