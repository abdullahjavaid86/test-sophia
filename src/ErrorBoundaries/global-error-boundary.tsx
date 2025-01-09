import { Component, ErrorInfo, ReactNode } from 'react';
import { UncaughtError } from '../components/UncaughtError';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  public state: State = {
    hasError: false,
  };

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Example "componentStack":
    //   in ComponentThatThrows (created by App)
    //   in ErrorBoundary (created by App)
    //   in div (created by App)
    //   in App
    if (import.meta.env.NODE_ENV !== 'production') {
      console.error('Error caught in ErrorBoundary:', error, info.componentStack);
    }
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <UncaughtError />;
    }

    return this.props.children;
  }
}
