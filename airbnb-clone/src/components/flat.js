import React from 'react';
import "./flat.css";

// const flat = {
//     name:"great flat",
//     price: 100
// }
// <Flat flat={flat} />

class Flat extends React.Component {
    handleClick = () => {
        //Call the parent method selectFlat
        this.props.selectFlat(this.props.flat);
    }
    render() {
        const tiltle = this.props.flat.price 
        + this.props.flat.priceCurrency + 
        " - " + this.props.flat.name ;
        const style = {
            //Template literal
            backgroundImage: `url('${this.props.flat.imageUrl}')`
        };
        return (
            <div className="flat" onClick={this.handleClick}>
                <div className="flat-picture" style={style}></div>
                <div className="flat-title">
                    {tiltle}
                </div>
            </div >
        );
    }
}

export default Flat;