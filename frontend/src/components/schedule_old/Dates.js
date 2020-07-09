import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getDates, deleteDate } from "../../actions/dates";

class Calendar extends Component {
  static propTypes = {
    dates: PropTypes.array.isRequired,
    getDates: PropTypes.func.isRequired,
    deleteDate: PropTypes.func.isRequired,
  };
  state = {
    date: new Date(),
  };

  componentDidMount() {
    this.props.getDates();
  }

  render() {
    return (
      <div>
        <ul className="list-group">
          <li className="list-group-item">Cras justo odio</li>
          <li className="list-group-item">Dapibus ac facilisis in</li>
          <li className="list-group-item">Morbi leo risus</li>
          <li className="list-group-item">Porta ac consectetur ac</li>
          <li className="list-group-item">Vestibulum at eros</li>
        </ul>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  dates: state.dateReducer.dates,
});

export default connect(mapStateToProps, { getDates, deleteDate })(Calendar);
