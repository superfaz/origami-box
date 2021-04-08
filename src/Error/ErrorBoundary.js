import React from "react";
import Error404 from "./Error404";
import Error404Page from "./Error404Page";
import Error500Page from "./Error500Page";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  render() {
    if (this.state.error) {
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
    }
    return this.props.children;
  }
}
