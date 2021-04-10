import React from "react";
import { withRouter } from "react-router";
import Error404 from "./Error404";
import Error404Page from "./Error404Page";
import Error500Page from "./Error500Page";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = null;
  }

  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo,
      location: this.props.location.pathname,
    });
  }

  render() {
    let inError =
      this.state !== null &&
      this.props.location.pathname === this.state.location;

    if (inError) {
      // Display the error page
      if (this.state.error instanceof Error404) {
        return <Error404Page />;
      } else {
        return (
          <Error500Page
            error={this.state.error}
            errorInfo={this.state.errorInfo}
          />
        );
      }
    } else {
      // Display the children
      if (this.state) {
        this.setState(null);
      }

      return this.props.children;
    }
  }
}

export default withRouter(ErrorBoundary);
