import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { toggleLayout } from './actions';
import  GardenLayout from './GardenLayout';
import './GardenLayoutList.css';
import GardenLayoutFilterNav from './GardenLayoutFilterNav.js';

class GardenLayoutList extends Component {
  static propTypes = {
    gardenLayouts: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        completed: PropTypes.bool.isRequired,
        data: PropTypes.object.isRequired
      }).isRequired),
    onLayoutClick: PropTypes.func
  }

  render() {
    const onLayoutClick = this.props.onLayoutClick;
    const gardenLayouts = this.props.gardenLayouts;
    return (
      <div className='garden-layout-list column is-two-thirds'>
      {(typeof gardenLayouts !== 'undefined') ?
      <div>
        <ul className='garden-layout-list__list columns'>
          {gardenLayouts.map(layout =>
            <GardenLayout
              key={layout.id}
              {...layout}
              onClick={() => onLayoutClick(layout.id)}
            />
          )}
        </ul>
        <GardenLayoutFilterNav />
      </div> :
      null
      }
      </div>
    );
  }
}

const getVisibleLayouts = (gardenLayouts, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return gardenLayouts
    case 'SHOW_COMPLETED':
      return gardenLayouts.filter(l => l.completed)
    case 'SHOW_ACTIVE':
      return gardenLayouts.filter(l => !l.completed)
    default:
      return gardenLayouts
  }
};

const mapStateToProps = (state) => {
  return {
    gardenLayouts: getVisibleLayouts(state.gardenLayouts, state.visibilityFilter)
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLayoutClick: (id) => {
      dispatch(toggleLayout(id))
    }
  }
};

const VisibleGardenLayoutList = connect(
  mapStateToProps,
  mapDispatchToProps
)(GardenLayoutList);

export default VisibleGardenLayoutList;
