import React, { Component } from 'react'
import Discussions from '../components/Discussions/Discussions';
import { connect } from 'react-redux';
import { fetchDiscussions } from '../actions/discussionActions'

class DiscussionsContainer extends Component {

  componentDidMount() {
    this.props.fetchDiscussions();
  }

  render() {
    return (
      <div>
        {this.props.discussions.length > 0 ? <Discussions discussions={this.props.discussions} /> : null}
      </div>
    )
  }
}

const mapStateToProps = state => ({
    discussions: state.discussions.discussions
})

const mapDispatchToProps = dispatch => ({
  fetchDiscussions: () => dispatch(fetchDiscussions())
})

export default connect(mapStateToProps, mapDispatchToProps)(DiscussionsContainer);