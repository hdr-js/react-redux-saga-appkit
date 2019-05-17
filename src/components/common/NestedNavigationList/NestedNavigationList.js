import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const styles = () => ({
  root: {
    width: '100%',
    maxWidth: 360,
    padding: 0,
    color: 'white',
  },
  levelZeroText: {
    color: 'white',
    fontSize: '16px',
    fontWeight: '700',
  },
  levelOneText: {
    color: 'white',
    paddingLeft: '16px',
  },
  levelTwoText: {
    color: 'white',
    fontSize: '14px',
    paddingLeft: '32px',
  },
  expandedItem: {
    backgroundColor: '#273B61',
  },
  selectedItem: {
    color: '#347FFE',
  },
});

class NestedList extends React.Component {
  state = {
    selectedItem: '',
    open: [],
  };

  handleClick = value => {
    this.setState(() => ({
      selectedItem: value,
    }));
  };

  checkIfItemHasChild = item => {
    return item && item.items && item.items.length > 0;
  };

  handleListItemClick = item => {
    const { open } = this.state;
    if (this.checkIfItemHasChild(item)) {
      const updatedOpen = open.includes(item.value)
        ? open.filter(entry => entry !== item.value)
        : [...open, item.value];
      this.setState(() => ({
        open: updatedOpen,
      }));
    } else {
      this.handleClick(item.value);
    }
  };

  getTextClass = level => {
    const { classes } = this.props;
    switch (level) {
      case 0:
        return classes.levelZeroText;
      case 1:
        return classes.levelOneText;
      case 2:
        return classes.levelTwoText;
      default:
        return classes.levelTwoText;
    }
  };

  getExpandedStyles = value => {
    const { classes } = this.props;
    const { open } = this.state;
    if (open && open.includes(value)) {
      return classes.expandedItem;
    }
    return '';
  };

  getSelectedStyles = value => {
    const { classes } = this.props;
    const { selectedItem } = this.state;
    if (selectedItem === value) {
      return classes.selectedItem;
    }
    return '';
  };

  getExpandIcon = item => {
    const { open } = this.state;
    if (!item) return null;
    if (open.includes(item.value)) {
      return <ExpandLess />;
    }
    if (!open.includes(item.value)) {
      return <ExpandMore />;
    }
    return null;
  };

  recursiveNestingRenderer = listData => {
    const { classes } = this.props;
    const { open } = this.state;
    return (
      <List component="nav" className={classes.root}>
        {listData && listData.length > 0 &&
          listData.map(item => (
            <div key={item.value}>
              <ListItem
                className={this.getExpandedStyles(item.value)}
                onClick={() => this.handleListItemClick(item)}
              >
                <ListItemText
                  key={item.value}
                  classes={{
                    primary: `${this.getTextClass(item.level)} ${this.getSelectedStyles(
                      item.value,
                    )}`,
                  }}
                  primary={item.label}
                />
                {this.checkIfItemHasChild(item) ? this.getExpandIcon(item) : null}
              </ListItem>
              <Collapse in={open.includes(item.value)} timeout="auto" unmountOnExit>
                {this.recursiveNestingRenderer(item.items)}
              </Collapse>
            </div>
          ))}
      </List>
    );
  };

  render() {
    const { listData } = this.props;
    return this.recursiveNestingRenderer(listData);
  }
}

NestedList.propTypes = {
  classes: PropTypes.object.isRequired,
  listData: PropTypes.array.isRequired,
};

export default withStyles(styles)(NestedList);
