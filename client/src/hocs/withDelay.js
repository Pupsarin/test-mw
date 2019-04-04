import React from 'react';


export default function withDelay(ComponentToWrap) {
    return class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                show: false,
            }
        }

        componentDidMount() {
            setTimeout(()=> {
                this.setState({ show: true })
            }, this.props.delay)
        }

        render() {
            return (
                this.state.show && <ComponentToWrap {...this.props}/>
            ) 
        }
    }
}