import React from 'react';
import { connect } from 'react-redux'

class OnlyVisitor extends React.Component {

    render() {
        const { children } = this.props
        if (this.props.app && this.props.app.user) {

            return null

        } else {

            return children
        }
    }

}

const mapStateToProps = (state, ownProps) => {

    return { app: state.app }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OnlyVisitor)