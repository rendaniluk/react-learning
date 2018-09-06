import React from 'react';
import "./memberlist.css";

class List extends React.Component {

    render(){
        const FullName = this.props.employee.FullName; 
        const location = this.props.employee.location; 
        const position = this.props.employee.Position;
        return (
           <div className='details'>
            {FullName}
            {location}
            {position}
           </div> 
        )
    }
}

export default List;