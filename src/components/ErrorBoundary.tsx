import React, { Component, ErrorInfo, ReactNode } from 'react';
import { ErrorFallback } from '.';

/**
 * Defines the props for the `ErrorBoundary` component.
 */
interface ErrorBoundaryProps {
  /**
   * The child elements to be rendered within the component.
   */
  children: ReactNode;
}

/**
 * Defines the state for the `ErrorBoundary` component.
 */
interface ErrorBoundaryState {
  /**
   * A boolean value indicating whether an error has occurred.
   */
  hasError: boolean;
  /**
   * The error that has occurred.
   */
  error?: Error;
}

/**
 * `ErrorBoundary` serves as an error handler for its children components.
 * It uses the `getDerivedStateFromError` lifecycle method to catch errors that occur in its children
 * and updates its state to display a fallback UI.
 * @class ErrorBoundary
 * @extends {Component<ErrorBoundaryProps, ErrorBoundaryState>}
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  /**
   * The initial state of the ErrorBoundary component.
   * @memberof ErrorBoundary
   */
  public state: ErrorBoundaryState = {
    hasError: false,
    error: undefined,
  };

  /**
   * `getDerivedStateFromError` lifecycle method is called when an error is thrown in any of the children components.
   * It updates the state of the ErrorBoundary component to display a fallback UI.
   * @static
   * @param {Error} error - The error that was thrown.
   * @returns {ErrorBoundaryState} - The state to update the ErrorBoundary component with.
   * @memberof ErrorBoundary
   */
  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI.
    return {
      hasError: true,
      error: error,
    };
  }

  /**
   * `componentDidCatch` lifecycle method is called when an error is caught by the `componentDidCatch` method.
   * It logs the error to the console.
   * @param {Error} error - The error that was caught
   * @param {ErrorInfo} errorInfo - An object containing additional information about the error.
   * @memberof ErrorBoundary
   */
  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  /**
   * Handles the reset event
   * @static
   * @param {React.FormEvent<HTMLFormElement>} e - the event object
   * @memberof ErrorBoundary
   */
  public static handleReset(e: React.FormEvent<HTMLFormElement>) {
    console.info('Reset event triggered...', e);
  }

  /**
   * Renders the `ErrorBoundary` component. If an error has occurred, it will render the `ErrorFallback` component,
   * otherwise it will render its children.
   * @returns {React.ReactNode} The JSX to render
   * @memberof ErrorBoundary
   */
  public render(): React.ReactNode {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} />;
    }

    return this.props.children;
  }
}
