import React, { Suspense } from "react";
import axios from "axios"
class ErrorBoundary extends React.Component {
    state = { hasError: false, error: null };
    static getDerivedStateFromError(error) {
      console.log(error,"please see error")
      return {
        hasError: true,
        error
      };
    }
// componentDidMount(){
//   axios.get("http://localhost:3004/remoteEntry.js").then((res)=>{
//     console.log("success")
//   }).catch((error)=>{
//     console.log(" error")
//   })

//}
    render() {
      if (this.state.hasError) {
        return this.props.fallback;
      }
      return this.props.children;
    }
  }
  export default ErrorBoundary